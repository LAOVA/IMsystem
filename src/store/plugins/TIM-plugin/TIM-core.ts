// 单独封装TIM核心功能，可脱离pinia使用

// 从v2.11.2起，SDK 支持了 WebSocket，推荐接入；v2.10.2及以下版本，使用 HTTP
// v2.24.0起，SDK 支持使用本地审核插件
import TIM, { ChatSDK } from 'tim-js-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import { ITimCoreProps, TIMCoreLoginParams, ITextPayload } from './type';

export default class TIMCore {
  public tim: ChatSDK | undefined

  public userID: string = ''

  constructor(props: ITimCoreProps) {
    this.initTimSdk(props.SDKAppID);

  }

  private initTimSdk = (SDKAppID: number) => {
    let options = {
      SDKAppID,// 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    };
    // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
    let tim = TIM.create(options); // SDK 实例通常用 tim 表示


    // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#setLogLevel 接口的说明</a>
    tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
    // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用


    // 注册腾讯云即时通信 IM 上传插件
    tim.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });

    this.tim = tim
  }

  public timLogin = async (options: TIMCoreLoginParams) => {
    // 第一步：登录SDK
    await this.tim?.login(options)
    this.userID = options.userID

    this.bindTIMEvent();


  }
  // 绑定相关的监听事件
  private bindTIMEvent = () => {
    // 监听sdk准备完成的事件
    this.tim?.on(TIM.EVENT.SDK_READY, this.handleSDKReady, this)
  }

  private handleSDKReady = () => {
    console.log("SDK准备完成");
    this.tim?.on(TIM.EVENT.MESSAGE_RECEIVED, this.handleMessageReceived, this)
  }

  public handleMessageReceived = (event: any) => {
    console.log("接收到信息", event);
  }


  // 创建对应的消息类型
  private getMessageOptions = (userID: string, payload: ITextPayload) => {
    return this.tim?.createTextMessage({
      to: userID,
      conversationType: TIM.TYPES.CONV_C2C,
      // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
      // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
      // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
      payload: {
        text: 'Hello world!'
      },
      // v2.20.0起支持C2C消息已读回执功能，如果您发消息需要已读回执，需购买旗舰版套餐，并且创建消息时将 needReadReceipt 设置为 true
      needReadReceipt: true
      // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
      // cloudCustomData: 'your cloud custom data'
    });
  }

  public sendMessage = async (userID: string, payload: ITextPayload) => {
    // 创建消息
    const messageOption = this.getMessageOptions(userID, payload)
    // 发送消息
    await this.tim?.sendMessage(messageOption!)
    console.log("发送成功");

  }
}






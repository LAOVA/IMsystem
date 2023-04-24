// TIM插件
/**
* 首先我们需要在插件里面
* 完成IM SDK的初始化
* 插件拥有登录功能
* 插件拥有收发功能
* 并且插件可以返回或者在我们的pinia模块里面
* 注册一个tim的一个实例
*/

import { PiniaPluginContext } from "pinia";
import TIMCore from "./TIM-core";

export default (context: PiniaPluginContext) => {
  // 如果有配置，说明该模块需要使用TIM相关功能
  if (context.options.TIMOptions) {
    const timCore = new TIMCore(context.options.TIMOptions())
    context.store.timCore = timCore
  }
}
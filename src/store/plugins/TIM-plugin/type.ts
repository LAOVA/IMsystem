// 定义插件初始化时的传参类型
export interface ITimCoreProps {
  SDKAppID: number
}

export interface TIMCoreLoginParams {
  userID: string,
  userSig: string,
}

export interface ITextPayload {
  text: string
}

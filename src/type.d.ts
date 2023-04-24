//为新的自定义选型添加类型（ TIM插件类型声明）

import 'pinia'
import TIMCore from './store/plugins/TIM-plugin/TIM-core'
import { ITimCoreProps } from './store/plugins/TIM-plugin/type'

declare module 'pinia' {
  // 创建新配置
  export interface DefineStoreOptionsBase<S, Store> {
    // TIM初始化参数
    TIMOptions?: () => ITimCoreProps
  }

  // 创建新属性
  export interface PiniaCustomStateProperties<S> {
    timCore: TIMCore
  }
}

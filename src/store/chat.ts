// 创建聊天状态模块
import { defineStore } from "pinia";

export const useTIMStore = defineStore('chat', {
  // 自定义选项
  TIMOptions() {
    return {
      SDKAppID: 1400806268
    }
  }
})
<template>
  <div class="login-box">
    <a-card style="width: 300px">
      <div class="title">
        <h2>IMsystem-在线聊天系统</h2>
      </div>
      <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="login">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from 'vue-router'
import { genTestUserSig } from './../../debug'
import { useTIMStore } from './../store/chat'

const router = useRouter()
const TIMStore = useTIMStore()

const formState = reactive({
  username: "",
  password: ""
})

const login = () => {
  router.push('/home')
  const { userSig } = genTestUserSig({
    userID: formState.username,
    SDKAppID: 1400806268,
    secretKey: "d43acc660868b9f11a62b70848a93eec9642e75588f1ff5f6bfd11912fb262e1"
  })
  TIMStore.timCore.timLogin({
    userSig,
    userID: formState.username
  })

}
</script>

<style lang="less" scoped>
@bgColor: #2f3447;

.login-box {
  width: 100%;
  height: 100vh;
  background-color: @bgColor;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    text-align: center;
    border-bottom: 2px solid @bgColor;
    margin-bottom: 40px;
  }
}
</style>
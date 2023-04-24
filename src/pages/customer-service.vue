<template>
  <div class="chat-box">
    <a-card class="chat-card">
      <a-menu class="contacts-list" id="dddddd" mode="inline">
        <a-menu-item key="1">Option 1</a-menu-item>
      </a-menu>
      <div class="chat-content">
        <div class="chat-message">
          <div class="chat-item" :class="{ 'chat-item-out': item.flow === 'out' }" v-for="(item, index) in chatLogs"
            :key="index">
            <div class="chat-item-content">
              <div :class="{
                  triangle: item.flow === 'in',
                  triangle_tow: item.flow === 'out',
                }"></div>
              {{ item.text }}
            </div>
          </div>
        </div>
        <a-textarea class="textarea" placeholder="回车发送消息" :auto-size="{ minRows: 2, maxRows: 5 }" />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const chatLogs = ref([
  {
    text: 'hello',
    flow: 'in'
  },
  {
    text: 'hello',
    flow: 'in'
  },
  {
    text: 'hello',
    flow: 'out'
  },
  {
    text: 'hi',
    flow: 'in'
  },
  {
    text: 'hi',
    flow: 'out'
  },
])

</script>

<style scoped lang="scss">
$borderColor: #f0f0f0;

.chat-box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(.ant-card-body) {
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.chat-card {
  width: 100%;
  height: 100%;
}

.contacts-list {
  width: 300px;
  height: 100%;
  border: 1px solid $borderColor;
}

.chat-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;

  .chat-message {
    flex: 1;
    padding: 20px 0;
    overflow-y: scroll;

    .chat-item-out {
      justify-content: flex-end;

      .chat-item-content {
        margin-right: 10px;
      }
    }

    .chat-item {
      padding: 20px;
      display: flex;

      .chat-item-content {
        position: relative;
        padding: 12px;
        margin: 10px 0 0 10px;
        border-radius: 5px;
        word-break: break-all;
        background-color: skyblue;
        color: #fff;
      }
    }
  }

  .textarea {
    border-radius: 5px;
  }
}

.triangle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -18px;
  border: 10px solid transparent;
  border-right: 10px solid skyblue;
}

.triangle_tow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -18px;
  border: 10px solid transparent;
  border-left: 10px solid skyblue;
}
</style>
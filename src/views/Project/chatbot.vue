<template>
    <div class="app-container">
      <div class="filter-container">
          <div class="chat-container">
            <div>
              <h1 class="title">SWS ALX</h1>
              <el-card class="card">
                <div class="message-container">
                  <div v-for="msg in messages" :key="msg.id" class="message-item" :class="{'message-server': msg.sender === 'server', 'message-user': msg.sender === 'user'}">
                    <div class="message-sender" :class="{'sender-server': msg.sender === 'bot', 'sender-user': msg.sender === 'user'}">
                      {{ msg.sender }}
                    </div>
                    <div v-if="msg.sender === 'user'" class="message-content user-message">
                      {{ msg.content }}
                    </div>
                    <div v-else class="message-content server-message">
                      {{ msg.content }}
                    </div>
                  </div>
                </div>
              </el-card>
              <div class="input-container">
                <input v-model="myMessage" class="input inputbox" type="text" placeholder="Type your message...">
                <button class="sendbox" @click="send">Send</button>
                <div class="welcome">{{ mesTemp }}</div>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>


<script>
import { useStore } from 'vuex'
import axios from 'axios'
export default {
  name: 'Chatroom',
  data() {
    return {
      messages: [
          { id: 'msg1', content: 'Hello from Group 4', sender: 'user' },
          { id: 'msg2', content: 'Response from Group 4', sender: 'bot' },
          { id: 'msg3', content: 'HajimiHajimi', sender: 'bot' },
          { id: 'msg4', content: 'Very Good!', sender: 'user' },
          { id: 'msg5', content: 'Hello from Group 4', sender: 'user' },
          { id: 'msg6', content: 'Response from Group 4', sender: 'bot' },
          { id: 'msg7', content: 'HajimiHajimi', sender: 'bot' },
          { id: 'msg8', content: 'Very Good!', sender: 'user' },
          { id: 'msg9', content: 'Hello from Group 4', sender: 'user' },
          { id: 'msg10', content: 'Response from Group 4', sender: 'bot' },
          { id: 'msg11', content: 'HajimiHajimi', sender: 'bot' },
          { id: 'msg12', content: 'Very Good!', sender: 'user' },
          { id: 'msg13', content: 'Hello from Group 4', sender: 'user' },
          { id: 'msg14', content: 'Response from Group 4', sender: 'bot' },
          { id: 'msg15', content: 'HajimiHajimi', sender: 'bot' },
          { id: 'msg16', content: 'Very Good!', sender: 'user' }
        ]
    }
  },
  setup() {
    const store = useStore() // 该方法用于返回store 实例
    console.log(store) // store 实例对象
    return { store }
  },
  created() {
    console.log('created')
    // this.initWebSocket()
    // 调用后端API获取当前userId所属的群组列表
    const userId = 4 // 替换为实际的用户ID
    const url = `http://localhost:8080/user-group/getGroups/${userId}` // 在URL中添加占位符
    axios.get(url)
      .then(response => {
        console.log(response.data)
        this.groups = response.data // 将获取到的群组列表赋值给组件的groups数组
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    websocketOnError() {
      console.log('连接失败')
    },
    websocketOnMessage(e) { // 数据接收
      this.msgList.push('###::' + e.data)
    },
    send() {
      if (!window.WebSocket) {
        return
      }
      if (this.websock.readyState === WebSocket.OPEN) {
        this.msgList.push('####::' + this.myMessage)
        const resObj = {
          id: '-1',
          message: this.id + ':' + this.myMessage
        }
        this.websock.send(JSON.stringify(resObj))
      } else {
        alert('与客服连接没有建立成功！')
      }
    },
    websocketClose(e) { // 关闭
      this.mesTemp = '与客服连接关闭。 \r\n'
      console.log('已关闭连接', e)
    }
  }
}
</script>

<style scoped>
.app-container {
  /* background-color: #e631bb; */
  padding: 1px;
  height: 92vh;
}

.chat-container {
  width: 100%;
  height: 91vh;
  padding: 20px;
  background-color: #f2fbff;
}

.input-container {
  /* width: 80%; */
  padding: 20px;
}

.inputbox {
  width:86%;
  height: 4vh;
  margin-right: 0.5vw;
}

.sendbox {
  width:12%;
  height:4vh;
  background-color: #39a5e9;
  border:0px;
  color: #d5d5d5;
}

.card {
  background-color: #f6fcff;
}
.message-container {
  height: 65vh;
  background-color: #f6fcff;
  overflow-y: auto;
  margin-bottom: 2vh;
}

.menu-container {
  width: 20%;
  height: 91vh;
  background-color: #ecf9ff;
  border-right: 1px solid #d5d5d5;
  overflow-y: auto;
  padding: 10px;
}

.menu-title {
  color:#2a3947;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 1px solid #d5d5d5;
  margin-bottom: 10px;
}
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.filter-container {
  display: flex; /* 设置此属性使子元素在水平方向上排列 */
  height: 100%; /* 设置高度为100%，使子元素可以被拉伸到与父元素相同的高度 */
}
.message-item {
  margin-top: 1vh;
  padding-top:1vh;
  margin-bottom: 1vh;
  padding-bottom: 1vh;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  /* background-color: #fd3939; */
}
.message-item.message-user {
  align-items: flex-end;
}

/* .message-item::before {
  content: '';
  position: absolute;
  left: 10%; 
  right: 10%;
  top: 0;
  border-top: 1px solid #8a8a8a;
  width: 80%;
} */

.centered-content {
  /* 使用这个类在没有选择组时显示的图标 */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* transform: scale(4); */
}

.message-server {
  justify-content: flex-start;
}

.message-user {
  justify-content: flex-end;
}

.message-content {
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
  /* background-color: #fd3939; */
}

.server-message {
  background-color: #dddddd;
  text-align: left;
}

.user-message {
  background-color: #4caf50;
  color: white;
}
.message-sender {
    font-size: 0.7em;
    color: gray;
    width: 100%;
  }

  .sender-server {
    text-align: left;
  }

  .sender-user {
    text-align: right;
  }

</style>
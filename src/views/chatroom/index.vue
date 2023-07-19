<template>
  <div class="app-container">
    <div class="filter-container">
        <div class="menu-container">
          <div class="menu-title">
            <span>Groups</span>
          </div>
          <div v-for="group in groups" :key="group.groupId" class="group-item" @click="selectGroup(group.groupId)">
            {{ group.groupName }}
          </div>
        </div>
        <div class="chat-container">
          <div v-if="selectedGroupName === null" class="centered-content">
              <img :src="require('@/views/chatroom/empty-room.png')" alt="Empty Room" />
          </div>
          <div v-else>
            <h1 class="title">{{ selectedGroupName }}</h1>
            <!-- <el-card class="carrd">
              <div class="message-container">
                <div v-for="msg in selectedGroupMessages" :key="msg.id" class="message-item">
                  <div v-if="msg.sender === 'user'" class="right">
                    {{ msg.sender }}:    {{ msg.content }}
                  </div>
                  <div v-else class="left">
                    {{ msg.sender }}:    {{ msg.content }}
                  </div>
                </div>
              </div>
            </el-card> -->
            <el-card class="card">
              <div class="message-container">
                <div v-for="msg in selectedGroupMessages" :key="msg.id" class="message-item" :class="{'message-server': msg.sender === 'server', 'message-user': msg.sender === 'user'}">
                  <div class="message-sender" :class="{'sender-server': msg.sender === 'server', 'sender-user': msg.sender === 'user'}">
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
              <button class="send sendbox" @click="send">Send</button>
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
      groups: [
        { groupId: 1, groupName: 'Group 1' },
        { groupId: 2, groupName: 'Group 2' },
        { groupId: 3, groupName: 'Group 3' },
        { groupId: 4, groupName: 'Group 4' }
        // { id: 1, name: 'Group 1' },
        // { id: 2, name: 'Group 2' },
        // { id: 3, name: 'Group 3' },
        // { id: 4, name: 'Group 4' }
        // More groups...
      ],
      messages: {
        1: [
          { id: 'msg1', content: 'Hello from Group 1', sender: 'user' },
          { id: 'msg2', content: 'Response from Group 1', sender: 'server' }
          // More messages...
        ],
        2: [
          { id: 'msg1', content: 'Hello from Group 2', sender: 'user' },
          { id: 'msg2', content: 'Response from Group 2', sender: 'server' }
          // More messages...
        ],
        3: [
          { id: 'msg1', content: 'Hello from Group 3', sender: 'user' },
          { id: 'msg2', content: 'Response from Group 3', sender: 'server' },
          { id: 'msg3', content: 'HajimiHajimi', sender: 'server' }
          // More messages...
        ],
        4: [
          { id: 'msg1', content: 'Hello from Group 4', sender: 'user' },
          { id: 'msg2', content: 'Response from Group 4', sender: 'server' },
          { id: 'msg3', content: 'HajimiHajimi', sender: 'server' },
          { id: 'msg4', content: 'Very Good!', sender: 'user' },
          { id: 'msg5', content: 'Hello from Group 4', sender: 'user' },
          { id: 'msg6', content: 'Response from Group 4', sender: 'server' },
          { id: 'msg7', content: 'HajimiHajimi', sender: 'server' },
          { id: 'msg8', content: 'Very Good!', sender: 'user' },
          { id: 'msg9', content: 'Hello from Group 4', sender: 'user' },
          { id: 'msg10', content: 'Response from Group 4', sender: 'server' },
          { id: 'msg11', content: 'HajimiHajimi', sender: 'server' },
          { id: 'msg12', content: 'Very Good!', sender: 'user' },
          { id: 'msg13', content: 'Hello from Group 4', sender: 'user' },
          { id: 'msg14', content: 'Response from Group 4', sender: 'server' },
          { id: 'msg15', content: 'HajimiHajimi', sender: 'server' },
          { id: 'msg16', content: 'Very Good!', sender: 'user' }
          // More messages...
        ]
        // More groups' messages...
      },
      selectedGroupId: null,
      selectedGroupName: null
    }
  },
  setup() {
    const store = useStore() // 该方法用于返回store 实例
    console.log(store) // store 实例对象
    return { store }
  },
  computed: {
    selectedGroupMessages() {
      return this.messages[this.selectedGroupId] || []
    }
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
  destroyed() {
    // 销毁
    // this.websocketClose()
  },
  methods: {
    // selectGroup(groupId) {
    //   this.selectedGroupId = groupId
    //   const selectedGroup = this.groups.find(group => group.id === groupId)
    //   this.selectedGroupName = selectedGroup ? selectedGroup.name : ''
    // },
    selectGroup(groupId) {
    this.selectedGroupId = groupId
    const selectedGroup = this.groups.find(group => group.groupId === groupId)
    this.selectedGroupName = selectedGroup ? selectedGroup.groupName : ''
    },
    // Other methods...
    // initWebSocket() { // 初始化websocket
    //   this.id = sessionStorage.getItem('username')
    //   let url
    //   const t = this.id
    //   url = 'ws://localhost:8080/websocket/' + t
    //   this.websock = new WebSocket(url)
    //
    //   this.mesTemp = '成功与客服建立连接！  \r\n'
    //   this.websock.onmessage = this.websocketOnMessage
    //   this.websock.onerror = this.websocketOnError
    //   this.websock.onclose = this.websocketClose
    // },
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
.group-item {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.group-item:hover {
  background-color: #f0f0f0;
}

.chat-container {
  width: 80%;
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
}

.message-container {
  height: 65vh;
  background-color: #ffffff;
  overflow-y: auto;
  margin-bottom: 2vh;
}

.menu-container {
  width: 20%;
  height: 91vh;
  background-color: #ecf9ff;
  border-right: 1px solid #000000;
  overflow-y: auto;
  padding: 10px;
}

.menu-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 1px solid #000000;
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

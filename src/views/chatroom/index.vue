<template>
  <div class="main-container">
    <div class="menu-container">
      <div class="menu-title">
        <span>Groups</span>
      </div>
      <div v-for="group in groups" :key="group.groupId" class="group-item" @click="selectGroup(group.groupId)">
        {{ group.groupName }}
      </div>
    </div>
    <div class="chat-container">
      <h1 class="title">{{ selectedGroupName }}</h1>
      <el-card class="carrd">
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
      </el-card>
      <div class="input-container">
        <input v-model="myMessage" class="input inputbox" type="text" placeholder="Type your message...">
        <button class="send sendbox" @click="send">Send</button>
        <div class="welcome">{{ mesTemp }}</div>
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
        { id: 1, name: 'Group 1' },
        { id: 2, name: 'Group 2' },
        { id: 3, name: 'Group 3' },
        { id: 4, name: 'Group 4' }
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
          { id: 'msg3', content: 'HajimiHajimi', sender: 'server' }
          // More messages...
        ]
        // More groups' messages...
      },
      selectedGroupId: null,
      selectedGroupName: 'Chat room'
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
    const url = `http://localhost:8080/user-group/${userId}` // 在URL中添加占位符
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
    selectGroup(groupId) {
      this.selectedGroupId = groupId
      const selectedGroup = this.groups.find(group => group.id === groupId)
      this.selectedGroupName = selectedGroup ? selectedGroup.name : ''
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
.main-container {
  display: flex;
  height: 100%;
}

/* .menu-container {
  width: 20%;
  border-right: 1px solid #ddd;
  overflow-y: auto;
} */

.group-item {
  padding: 10px;
  cursor: pointer;
}

.group-item:hover {
  background-color: #f0f0f0;
}

.chat-container {
  width: 80%;
  padding: 20px;
}
.input-container {
  width: 80%;
  padding: 5px;
}

.inputbox {
  width:80%;
  height: 4vh;
  margin-right: 0.5vw;
}

.sendbox {
  width:12%;
  height:4vh;
}

.message-container {
  height: 65vh;
  overflow-y: auto;
  margin-bottom: 2vh;
}

.menu-container {
  width: 20%;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  padding: 10px;
}

.menu-title {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

</style>

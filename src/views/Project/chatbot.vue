<template>
  <div class="app-container">
    <div class="filter-container">
        <div class="chat-container">
          <div>
            <h1 class="title">Chat Bot</h1>
            <el-card class="card">
              <div class="message-container"  ref="messageContainer">
                <div v-for="(msg, index) in messages" :key="index" class="message-item" :class="{'message-server': msg.sender === 'server', 'message-user': msg.sender === 'user'}">
                  <div class="message-sender" :class="{'sender-server': msg.sender === 'bot', 'sender-user': msg.sender === 'user'}">
                    {{ msg.sender }}
                  </div>
                  <div v-if="msg.sender === 'user'" class="message-content user-message">
                    {{ msg.content }}
                  </div>
                  <div v-else>
                    <div v-if="msg.msgType === 'button'" class="message-content server-message">
                      <p>{{ msg.title }}</p>
                      <button v-for="button in msg.buttons" :key="button.value" @click="sendButtonMessage(button.value)" class="but">
                        {{ button.title }}
                      </button>
                    </div>
                    <div v-else-if="msg.msgType === 'plain'" class="message-content server-message">
                      <p style="white-space: pre-wrap;">{{ msg.content }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
            <div class="input-container">
              <input v-model="myMessage" class="input inputbox" type="text" placeholder="Type your message...">
              <button class="sendbox" @click="send">Send</button>
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
      count: 0,
      numberArray: [2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1],
      curCount: 0,
      myMessage: null,
      msgList: [
        {
          title: 'Hello! Here are the options for you, so what do you want to do?',
          buttons: [
            { title: 'Your Task Deadline', value: 'My deadlines' },
            { title: 'Your Todo Task', value: 'My tasks' },
            { title: 'Assign Task', value: 'Assign task' }],
          msgType: 'button',
          sender: 'bot'
        },
        {
          content: 'Hello, what can I help you?' ,
          msgType: 'plain',
          sender: 'bot'
        },
        {
          content: "1.Your in processing task 'Market research' will end at 2023-07-30 10:00:00, the remaining time is 7 days 13 hours, its priority level is NORMAL.\n " +
            "2.Your in processing task 'Make a schedule' will end at 2023-07-30 10:00:00, the remaining time is 7 days 13 hours, its priority level is NORMAL. \n" +
            "3.Your in processing task 'Interface design' will end at 2023-07-30 10:00:00, the remaining time is 7 days 13 hours, its priority level is NORMAL. \n" +
            "4.Your in processing task 'Repair the loop hole of web' will end at 2023-07-30 10:00:00, the remaining time is 7 days 13 hours, its priority level is NORMAL. \n" +
            "5.Your in processing task 'Security incidence response' will end at 2023-07-30 10:00:00, the remaining time is 7 days 13 hours, its priority level is IMPORTANT. \n" ,
          msgType: 'plain',
          sender: 'bot'
        },
        {
          title: 'Click the button to know detail',
          buttons: [
            { title: 'Market research', value: 'Market research' },
            { title: 'Make a schedule', value: 'Make a schedule' },
            { title: 'Interface design', value: 'Interface design' },
            { title: 'Repair the loop hole of web', value: 'Repair the loop hole of web' },
            { title: 'Security incidence response', value: 'Security incidence response' }
          ],
          msgType: 'button',
          sender: 'bot'
        },
        {
          content: 'Okay, I can help you.' ,
          msgType: 'plain',
          sender: 'bot'
        },
        {
          content: "So, are you sure to know the task 'Security incidence response' ?" ,
          msgType: 'plain',
          sender: 'bot'
        },
        {
          content: "In Group4, your task 'Security incidence response' status is IN_PROCESS, the detail is 'Identify, analyze, and mitigate security incidents swiftly and effectively, ensuring protection against potential threats and minimizing damage'.\nThe priority and the deadline for it is IMPORTANT and 2023-07-26 23:59 respectively." ,
          msgType: 'plain',
          sender: 'bot'
        }, // ok
        // round 2:
        {
          title: 'Hello! Here are the options for you, so what do you want to do?',
          buttons: [
            { title: 'Your Task Deadline', value: 'My deadlines' },
            { title: 'Your Todo Task', value: 'My tasks' },
            { title: 'Assign Task', value: 'Assign task' }],
          msgType: 'button',
          sender: 'bot'
        },
        {
          content: 'Hello, what can I help you?' ,
          msgType: 'plain',
          sender: 'bot'
        }, //assign task
        {
          title: 'Here are your leading groups.Choose one group to assign task.',
          buttons: [
            { title: 'Group5', value: 'Assign task for Group5' },
            { title: 'Group6', value: 'Assign task for Group6' },
          ],
          msgType: 'button',
          sender: 'bot'
        }, //Group6
        {
          content: "What's the deadline?",
          msgType: 'plain',
          sender: 'bot'
        },
        {
          title: "What's the priority of the task?",
          buttons: [
            { title: 'LOW', value: 'LOW' },
            { title: 'NORMAL', value: 'NORMAL' },
            { title: 'IMPORTANT', value: 'IMPORTANT' }],
          msgType: 'button',
          sender: 'bot'
        }, // normal
        {
          content: "What's the task name you want to assign?",
          msgType: 'plain',
          sender: 'bot'
        }, //Deploy a service
        {
          content: "So, you want to assign task named 'Deploy a service', the priority is NORMAL, deadline is 2023-08-12, right?",
          msgType: 'plain',
          sender: 'bot'
        }, //yes
        {
          content: "Fulfilled, your task is assigned!",
          msgType: 'plain',
          sender: 'bot'
        },
      ],
      messages: [
        // {
        //   id: 'msg1',
        //   title: 'Hello! Here is the options for you, so what do you want to do?',
        //   buttons: [
        //     { title: 'Your Task Deadline', value: 'i want to know my ddls' },
        //     { title: 'Your Assigned Task', value: 'i want to know my task' },
        //     { title: 'Assign Task', value: 'assign task' }],
        //   msgType: 'button',
        //   sender: 'bot'
        // },
        // {
        //   id: 'msg2',
        //   content: 'Hello, what can I help you?' ,
        //   msgType: 'plain',
        //   sender: 'bot'
        // },
        // {
        //   id: 'msg3',
        //   content: 'I want to know my deadlines',
        //   sender: 'user'
        // }
      ]
    }
  },
  setup() {
    const store = useStore() // 该方法用于返回store 实例
    console.log(store) // store 实例对象
    return { store }
  },
  created() {
    // sessionStorage.setItem('userId', '22')
  },
  methods: {
    sendButtonMessage(value) {
      this.messages.push({
        content: value,
        sender: 'user'
      })
      this.$nextTick(() => {
        const messageContainer = this.$refs.messageContainer;
        messageContainer.scrollTop = messageContainer.scrollHeight;
      });
      this.myMessage = ''
      // axios.post('https://172.25.110.31:8090/sendbot', {
      //     "content": value,
      //     "uid":sessionStorage.getItem('userId')
      // }).then(response => {
      //   console.log(response.data)
      //    response.data.messages.forEach(element => {
      //     element['sender'] = 'bot'
      //     this.messages.push(element)
      //    });
         // this.$nextTick(() => {
          //   const messageContainer = this.$refs.messageContainer;
          //   messageContainer.scrollTop = messageContainer.scrollHeight;
          // });
      // })
      setTimeout(() => {
        let number = this.numberArray[this.count]
        if(number === 1) {
          this.messages.push(this.msgList[this.curCount])
        }else{
          this.messages.push(this.msgList[this.curCount])
          this.messages.push(this.msgList[this.curCount+1])
        }
        this.curCount += number
        console.log(this.messages)
        this.count += 1
        this.$nextTick(() => {
          const messageContainer = this.$refs.messageContainer;
          messageContainer.scrollTop = messageContainer.scrollHeight;
        });
      }, 2000);
      console.log(this.messages)
    },
    buttonClick(value) {
    },

    send() {
      this.messages.push({
        content: this.myMessage,
        sender: 'user'
      })
      this.$nextTick(() => {
        const messageContainer = this.$refs.messageContainer;
        messageContainer.scrollTop = messageContainer.scrollHeight;
      });
      setTimeout(() => {
        let number = this.numberArray[this.count]
        if(number === 1) {
          this.messages.push(this.msgList[this.curCount])
        }else{
          this.messages.push(this.msgList[this.curCount])
          this.messages.push(this.msgList[this.curCount+1])
        }
        this.curCount += number
        console.log(this.messages)
        this.count += 1
        this.$nextTick(() => {
          const messageContainer = this.$refs.messageContainer;
          messageContainer.scrollTop = messageContainer.scrollHeight;
        });
      }, 2000);
      // axios.post('https://172.25.110.31:8090/sendbot', {
      //     "content": this.myMessage,
      //     "uid":sessionStorage.getItem('userId')
      // }).then(response => {
      //   console.log(response.data)
      //    response.data.messages.forEach(element => {
      //     element['sender'] = 'bot'
      //     this.messages.push(element)
      //    });
      //    this.$nextTick(() => {
      //       const messageContainer = this.$refs.messageContainer;
      //       messageContainer.scrollTop = messageContainer.scrollHeight;
      //     });
      // })
      this.myMessage = ''
      console.log(this.messages)
    },
  }
}
</script>

<style scoped>
.message-content button {
    margin-top: 10px;
    display: block;
  }
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
  max-width: 100%;
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

  .but {
    background-color: #f1f0eb;
    border: dashed;
    transition: 0.3s ease;
    border-width: 1px;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.16), -3px -3px 6px rgba(255, 255, 255, 0.5);
  }
  .but:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>

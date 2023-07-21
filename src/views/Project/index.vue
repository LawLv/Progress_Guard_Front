<template>
  <div class="mixin-components-container">
    <div class="container">
      <h1 class="page-title">My Project</h1>
      <div class="component-item">
        <router-link to="/project/chatbot">
          <pan-thumb width="100px" height="100px" image="https://cdn.discordapp.com/attachments/1095324372685832286/1131519155900784650/chatbot.png">
            Ask me
          </pan-thumb>
        </router-link>
      </div>
      <el-row>
        <el-card class="project-card">
          <div class="project-grid">
            <div
              v-for="project in projects"
              :key="project.groupId"
              class="project-block"
              @click="toTasks(project.groupId)"
              :style="{ backgroundColor: project.color }"
            >
              <div class="project-image" :style="{'background-image': 'url(' + getProjectImage(project.groupId) + ')'}"></div>
              <div class="project-title">{{ project.groupName }}</div>
            </div>
            <router-link to="/project/create" class="add-project-block">
              <i class="el-icon-circle-plus-outline" /> Add Project
            </router-link>
          </div>
        </el-card>
      </el-row>
    </div>

<!--    <div class="dashboard-container">-->
<!--      <component :is="currentRole" />-->
<!--    </div>-->
<!--    <el-row :gutter="20" style="margin-top:50px;">-->
<!--      <el-col :span="6">-->
<!--        <el-card class="box-card">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>Material Design 的input</span>-->
<!--          </div>-->
<!--          <div style="height:100px;">-->
<!--            <el-form :model="demo" :rules="demoRules">-->
<!--              <el-form-item prop="title">-->
<!--                <md-input v-model="demo.title" icon="el-icon-search" name="title" placeholder="输入标题">-->
<!--                  标题-->
<!--                </md-input>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->

<!--      <el-col :span="6">-->
<!--        <el-card class="box-card">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>图片hover效果</span>-->
<!--          </div>-->
<!--          <div class="component-item">-->
<!--            <pan-thumb width="100px" height="100px" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191">-->
<!--              vue-element-admin-->
<!--            </pan-thumb>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->

<!--      <el-col :span="6">-->
<!--        <el-card class="box-card">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>水波纹 waves v-directive</span>-->
<!--          </div>-->
<!--          <div class="component-item">-->
<!--            <el-button v-waves type="primary">-->
<!--              水波纹效果-->
<!--            </el-button>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->

<!--      <el-col :span="6">-->
<!--        <el-card class="box-card">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>hover text</span>-->
<!--          </div>-->
<!--          <div class="component-item">-->
<!--            <mallki class-name="mallki-text" text="vue-element-admin" />-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import PanThumb from '@/components/PanThumb'
import MdInput from '@/components/MDinput'
import Mallki from '@/components/TextHoverEffect/Mallki'
import waves from '@/directive/waves/index.js'
import axios from "axios"; // 水波纹指令

export default {
  components: {
    PanThumb,
    MdInput,
    Mallki,
    adminDashboard
  },
  directives: {
    waves
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'))
      } else {
        callback()
      }
    }
    return {
      currentRole: 'adminDashboard',
      demo: {
        title: ''
      },
      demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }]
      },
      projects: [
        { groupId: 1, groupName: 'Project 1', color: this.getRandomLightColor() },
        { groupId: 2, groupName: 'Project 2', color: this.getRandomLightColor() },
        { groupId: 3, groupName: 'Project 3', color: this.getRandomLightColor() },
        { groupId: 4, groupName: 'Project 3', color: this.getRandomLightColor() },
        { groupId: 5, groupName: 'Project 3', color: this.getRandomLightColor() },
        { groupId: 6, groupName: 'Project 3', color: this.getRandomLightColor() },
        { groupId: 7, groupName: 'Project 3', color: this.getRandomLightColor() },
        // add more projects as needed
      ],
    };
  },
  methods: {
    getList() {
      axios.get('http://localhost:8080/user-group/getGroups/' + sessionStorage.getItem('userId'))
        .then(response => {
          console.log('get response')
          console.log(response.data)
          this.projects = response.data
        })
    },
    getProjectImage: function(projectId) {
      var random = Math.floor(Math.random() * 2) + 1;  // generates a random number (1 or 2)
      var imagePath;
      if (random === 1) {
        imagePath = require('@/views/Project/pbg.png');
      } else {
        imagePath = require('@/views/Project/pbg.png');
      }
      return imagePath;
    },
    toTasks(groupId) {
      sessionStorage.setItem('groupId', groupId)
      this.$router.push('/project/oneproject')
    },

    getRandomLightColor() {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 80 + Math.floor(Math.random() * 20); // 80-100
      const lightness = 85 + Math.floor(Math.random() * 15); // 85-100
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    },
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // if (!this.roles.includes('admin')) {
    // this.currentRole = 'editorDashboard'
    // }
    // sessionStorage.setItem('userId', '4')
    this.getList()
  }
};
</script>

<style scoped>
.project-card {
  margin-bottom: 4vh;
  width: 83vw;
  background-color: #f2f2f2;
  /* opacity: 0.5; */
  border-radius: 2em;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.project-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin-top: 1em;
}
.project-block {
  width: 10vw;
  height: 10vw;
  border-radius: 1em;
  margin: 1em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease;
  overflow: hidden;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.16), -3px -3px 6px rgba(255, 255, 255, 0.5);
}
.add-project-block:hover,
.project-block:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.project-image {
  width: 100%;
  height: 70%;
  background-size: cover;
  background-position: center;
}

.project-title {
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #000; /* Ensure text is visible on light backgrounds */
}
.add-project-block {
  background-color: rgb(239, 255, 239) transparent;
  color: rgb(0, 0, 0);
  width: 10vw;
  height: 10vw;
  border-radius: 1em;
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease;
  border: 3px dashed rgb(151, 146, 146);
}
.mixin-components-container {
  background-color: #eefafc;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
</style>

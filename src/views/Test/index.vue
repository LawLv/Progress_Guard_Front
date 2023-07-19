<template>
    <div class="mixin-components-container">
        <div class="container">
          <h1 class="page-title">My Project</h1>
          <div class="project-grid">
            <div
              v-for="project in projects"
              :key="project.id"
              class="project-block"
              @click="toTasks(project.id)"
              :style="{ backgroundColor: project.color }"
            >
              <div class="project-title">{{ project.title }}</div>
            </div>
            <router-link to="/project/create" class="project-block add-project-block">
              <i class="el-icon-circle-plus-outline" /> Add Project
            </router-link>
          </div>
        </div>
        <el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span>Buttons</span>
            </div>
            <div style="margin-bottom:50px;">
            <el-col :span="4" class="text-center">
                <router-link class="pan-btn blue-btn" to="/documentation/index">
                Documentation
                </router-link>
            </el-col>
            <el-col :span="4" class="text-center">
                <router-link class="pan-btn light-blue-btn" to="/icon/index">
                Icons
                </router-link>
            </el-col>
            <el-col :span="4" class="text-center">
                <router-link class="pan-btn pink-btn" to="/excel/export-excel">
                Excel
                </router-link>
            </el-col>
            <el-col :span="4" class="text-center">
                <router-link class="pan-btn green-btn" to="/table/complex-table">
                Table
                </router-link>
            </el-col>
            <el-col :span="4" class="text-center">
                <router-link class="pan-btn tiffany-btn" to="/example/create">
                Form
                </router-link>
            </el-col>
            <el-col :span="4" class="text-center">
                <router-link class="pan-btn yellow-btn" to="/theme/index">
                Theme
                </router-link>
            </el-col>
            </div>
        </el-card>
        </el-row>

        <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="6">
                <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>Material Design 的input</span>
                </div>
                <div style="height:100px;">
                    <el-form :model="demo" :rules="demoRules">
                    <el-form-item prop="title">
                        <md-input v-model="demo.title" icon="el-icon-search" name="title" placeholder="输入标题">
                        标题
                        </md-input>
                    </el-form-item>
                    </el-form>
                </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>图片hover效果</span>
                </div>
                <div class="component-item">
                    <pan-thumb width="100px" height="100px" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191">
                    vue-element-admin
                    </pan-thumb>
                </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>水波纹 waves v-directive</span>
                </div>
                <div class="component-item">
                    <el-button v-waves type="primary">
                    水波纹效果
                    </el-button>
                </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>hover text</span>
                </div>
                <div class="component-item">
                    <mallki class-name="mallki-text" text="vue-element-admin" />
                </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="dashboard-container">
            <component :is="currentRole" />
        </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import adminDashboard from './admin'
  import PanThumb from '@/components/PanThumb'
  import MdInput from '@/components/MDinput'
  import Mallki from '@/components/TextHoverEffect/Mallki'
  import waves from '@/directive/waves/index.js' // 水波纹指令

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
          { id: 1, title: 'Project 1', color: this.getRandomLightColor() },
          { id: 2, title: 'Project 2', color: this.getRandomLightColor() },
          { id: 3, title: 'Project 3', color: this.getRandomLightColor() },
          // add more projects as needed
        ],
      };
    },
    methods: {
      toTasks(id) {
        // your code to navigate to tasks
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
        if (!this.roles.includes('admin')) {
        this.currentRole = 'editorDashboard'
        }
    }
  };
  </script>
  
  <style scoped>
  .app-container {
    padding: 1px;
    height: 92vh;
  }
  .filter-container {
    display: flex;
    height: 100%;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .project-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    margin-top: 1em;
  }
  .project-block {
    width: 10vw;
    height: 10vw;
    border-radius: 1em;
    margin: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s ease;
  }
  .project-block:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  .project-title {
    text-align: center;
    color: #000; /* Ensure text is visible on light backgrounds */
  }
  .add-project-block {
    background-color: green;
    color: white;
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
  
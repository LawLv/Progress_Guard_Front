<template>
  <div id="app" class="app-container">
    <div class="sidebar" :style="{width: variables.sideBarWidth}">
      <logo v-if="showLogo" :collapse="isCollapse" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="selectedMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :active-text-color="variables.menuActiveText"
          mode="vertical"
          @select="handleSelect"
        >
          <el-menu-item index="project">
            <svg-icon icon-class="tab" /> My Project
          </el-menu-item>
          <el-menu-item index="task">
            <svg-icon icon-class="skill" /> My Task
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="main-content">
      <div v-if="selectedMenu === 'project'">
        <el-button type="primary">
          <i class="el-icon-circle-plus-outline" /> New Project
        </el-button>
        <h3>My Project</h3>
        <div v-for="project in projects" :key="project.id" class="project">
          <router-link :to="`/project/${project.id}`">{{ project.title }}</router-link>
        </div>
        <!-- <div v-for="project in projects" :key="project.id" class="project">
            {{ project.title }}
          </div> -->
      </div>
      <div v-else>
        <h3>My Task</h3>
        <el-input placeholder="Add Tasks" class="task">
          <template #prepend>
            <i class="el-icon-circle-plus-outline" />
          </template>
        </el-input>
        <div v-for="task in tasks" :key="task.id" class="task">
          {{ task.title }} in {{ task.project }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/layout/components/Sidebar/Logo.vue'
import variables from '@/styles/variables.scss'

export default {
  name: 'App',
  components: { Logo },
  data() {
    return {
      selectedMenu: 'project',
      projects: [
        { id: 1, title: 'Project 1' },
        { id: 2, title: 'Project 2' }
      ],
      tasks: [
        { id: 1, title: 'Task 1', project: 'Project 1' },
        { id: 2, title: 'Task 2', project: 'Project 2' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleSelect(index) {
      this.selectedMenu = index
    }
  }
}
</script>

  <style lang="scss" scoped>
  @import "@/styles/variables.scss";

  .app-container {
    display: flex;
  }

  .sidebar {
    width: $sideBarWidth;
    padding: 20px;
    border-right: 1px solid #ddd;
  }

  .main-content {
    flex-grow: 1;
    padding: 20px;
  }

  .project,
  .task {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>

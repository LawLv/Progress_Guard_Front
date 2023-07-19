<template>
    <div class="app-container">
      <div class="filter-container">
        <div class="container">
          <h1 class="page-title">My Project</h1>
          <div class="project-grid">
            <div
              v-for="project in projects"
              :key="project.id"
              class="project-block"
              @click="toTasks(project.id)"
            >
              <div class="project-title">{{ project.title }}</div>
            </div>
            <router-link to="/project/create" class="project-block add-project-block">
              <i class="el-icon-circle-plus-outline" /> Add Project
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        projects: [
          { id: 1, title: 'Project 1' },
          { id: 2, title: 'Project 2' },
          { id: 3, title: 'Project 3' },
          // add more projects as needed
        ],
      };
    },
    methods: {
      toTasks(id) {
        // your code to navigate to tasks
      },
    },
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
    background-color: #eee;
    cursor: pointer;
    transition: 0.3s ease;
  }
  .project-block:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  .project-title {
    text-align: center;
  }
  .add-project-block {
    background-color: green;
    color: white;
  }
  </style>
  
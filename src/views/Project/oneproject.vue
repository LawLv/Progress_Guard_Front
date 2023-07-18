<template>
  <div>
    <h1>Project {{ projectId }}</h1>
    <div v-for="task in tasks" :key="task.id">
      {{ task.title }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectId: null,
      tasks: []
    }
  },
  created() {
    this.projectId = this.$route.params.id
    // 你可以根据projectId来获取该项目的任务
    // 假设你有一个名为getTasks的方法，可以获取到项目的任务
    this.tasks = this.getTasks(this.projectId)
  },
  methods: {
    getTasks(id) {
      // 实现获取项目的任务
    }
  }
}
</script>

<template>
  <div class="app-container">
    <div class="filter-container">
      <h1 class="page-title">Project Tasks</h1>
      <el-input v-model="listQuery.taskName" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.taskPriority" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <!--      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">-->
      <!--        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />-->
      <!--      </el-select>-->
      <!--      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">-->
      <!--        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />-->
      <!--      </el-select>-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <!--      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">-->
      <!--        Export-->
      <!--      </el-button>-->
      <!--      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">-->
      <!--        reviewer-->
      <!--      </el-checkbox>-->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Deadline" width="150px" align="center">
        <template slot-scope="{row}">
<!--          <span>{{ row.deadline | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>-->
          <span>{{ formatDateTime(row.deadline) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Task Name" min-width="150px">
        <template slot-scope="{row}">
<!--          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>-->
<!--          <el-tag>{{ row.taskName | typeFilter }}</el-tag>-->
          <el-tag>{{row.taskName}}</el-tag>
        </template>
      </el-table-column>
<!--      <el-table-column label="Author" width="110px" align="center">-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.author }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">-->
<!--        <template slot-scope="{row}">-->
<!--          <span style="color:red;">{{ row.reviewer }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="Priority" width="80px">-->
<!--        <template slot-scope="{row}">-->
<!--          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="Readings" align="center" width="95">-->
<!--        <template slot-scope="{row}">-->
<!--          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>-->
<!--          <span v-else>0</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="Status" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
<!--          <el-button type="primary" size="mini" @click="handleUpdate(row)">-->
<!--            Edit-->
<!--          </el-button>-->
          <el-button v-if="row.status =='UNASSIGNED'" size="mini" type="success" @click="handleModifyStatus(row,'IN_PROCESS')">
            Claim
          </el-button>
          <el-button v-if="row.status=='IN_PROCESS'" size="mini" @click="handleModifyStatus(row,'COMPLETED')">
            Complete
          </el-button>
          <el-button v-if="row.status=='COMPLETED'" size="mini" type="danger" @click="handleModifyStatus(row,'CLOSED')">
            Close
          </el-button>
          <el-button v-if="row.status=='COMPLETED'" size="mini" type="danger" @click="handleModifyStatus(row,'IN_PROCESS')">
            Back
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 600px; margin-left:50px;">
        <el-form-item label="Member" prop="type">
          <el-select v-model="temp.userId" class="filter-item" placeholder="Please select">
            <el-option v-for="item in memberOptions" :key="item.userId" :label="item.mail" :value="item.userId" />
          </el-select>
        </el-form-item>
        <el-form-item label="Deadline" prop="timestamp">
          <el-date-picker v-model="temp.deadline" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Task Name" prop="title">
          <el-input v-model="temp.taskName" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
<!--        <el-form-item label="priority">-->
<!--          <el-rate v-model="convertedPriority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />-->
<!--        </el-form-item>-->
        <el-form-item label="Priority">
          <el-select v-model="temp.taskPriority" class="filter-item" placeholder="Please select">
            <el-option v-for="item in priorityOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="temp.taskDesc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import axios from "axios" // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  computed: {
    convertedPriority: {
      get() {
        return this.temp.taskPriority + 1 // 将评分值减去 1
      },
      set(value) {
        this.temp.taskPriority = value - 1 // 将评分值加上 1
      }
    }
  },
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        // page: 1,
        // limit: 20,
        taskPriority: undefined,
        taskName: undefined
        // type: undefined,
        // sort: '+id'
      },
      memberOptions: null,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['UNASSIGNED', 'IN_PROCESS'],
      priorityOptions: ['LOW', 'NORMAL', 'IMPORTANT'],
      showReviewer: false,
      temp: {
        // id: undefined,
        groupId: sessionStorage.getItem('groupId'),
        taskPriority: 'LOW',
        taskDesc: '',
        deadline: new Date(),
        taskName: '',
        userId: '',
        status: 'IN_PROCESS',
        logUid: sessionStorage.getItem('userId')
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'blur' }],
        // timestamp: [{ required: true, message: 'timestamp is required', trigger: 'blur' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    formatDateTime(dateTimeStr) {
      const date = new Date(dateTimeStr)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hour = String(date.getHours()).padStart(2, '0')
      const minute = String(date.getMinutes()).padStart(2, '0')

      return `${year}-${month}-${day} ${hour}:${minute}`
    },
    getList() {
      this.listLoading = true
      axios.get('http://localhost:8080/task/get-by-condition', {
        params: {
          userId: sessionStorage.getItem('userId'),
          groupId: sessionStorage.getItem('groupId')
        }
      }).then(response => {
        console.log(response.data)
        this.list = response.data
        this.listLoading = false
      })
      axios.get('http://localhost:8080/user-group/getUsers/' + sessionStorage.getItem('groupId'))
        .then(response => {
          console.log(response.data)
          this.memberOptions = response.data
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      console.log('row is : ')
      console.log(row)
      row.logUid = sessionStorage.getItem('userId')
      row.status = status
      axios.post('http://localhost:8080/task/update', row)
        .then(response => {
          console.log(response.data)
        })
      this.$message({
        message: '操作Success',
        type: 'success'
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        // id: undefined,
        groupId: sessionStorage.getItem('groupId'),
        taskPriority: 'LOW',
        taskDesc: '',
        deadline: new Date(),
        taskName: '',
        userId: '',
        status: 'IN_PROCESS',
        logUid: sessionStorage.getItem('userId')
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          // createArticle(this.temp).then(() => {
          //   this.list.unshift(this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: 'Success',
          //     message: 'Created Successfully',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
          console.log('this.temp is : ')
          console.log(this.temp)
          axios.post('http://localhost:8080/task/create', this.temp)
            .then(response => {
              console.log(response.data)
              // this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            })
            .catch(error => {
              console.error(error)
            })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style scoped>
/* .filter-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
} */
</style>

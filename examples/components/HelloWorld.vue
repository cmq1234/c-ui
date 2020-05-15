<template>
  <div class="hello">
    <c-form
      id='form'
      :columns="columns"
      :model="model"
      label-position="left"
      :inline="true"
    />
    <div style="width:70%">
      <c-query
        :columns="columns"
        :model="queryModel"
      >
      </c-query>
    </div>
    <el-button type="button" @click="getFormData">获取form</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      model: { job: '程序员' },
      columns: [{ colName: 'name', aliasColName: '姓名', dispType: 1, required: 1, addCtrl: 1, editCtrl: 1 },
        { colName: 'age', aliasColName: '年龄', dispType: 5, editCtrl: 1, addCtrl: 1 },
        { colName: 'job', aliasColName: '职业', dispType: 1, addCtrl: 1, editCtrl: 2 },
        { colName: 'mail', aliasColName: '邮箱', dispType: 103, addCtrl: 1, editCtrl: 3 },
        { colName: 'time', aliasColName: '入职时间', dispType: 4 },
        { colName: 'image', aliasColName: '相片', dispType: 8 },
        { colName: 'addCtrl', aliasColName: '添加控制', dispType: 1 },
        { colName: 'showCtrl', aliasColName: '显示控制', dispType: 1 },
        { colName: 'editCtrl', aliasColName: '编辑控制', dispType: 1 },
        { colName: 'required', aliasColName: '是否必填', dispType: 1 },
        { colName: 'queryCtrl', aliasColName: '查询控制', dispType: 1 }],
      queryModel: {}
    }
  },
  methods: {
    getFormData (data) {
      console.log(this.model)
    }
  }
}
</script>

<style scoped lang="scss">

</style>

<template>
  <div class="hello">
    <c-form
      id='form'
      :columns="columns"
      :model="model"
      label-position="left"
      :inline="true"
      :select-val="fldVal"
    />
    <div style="width:70%">
      <c-query
        :columns="columns"
        :model="queryModel"
        :select-val="fldVal"
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
        { colName: 'job', aliasColName: '职业', dispType: 3, addCtrl: 1, editCtrl: 2 },
        { colName: 'mail', aliasColName: '邮箱', dispType: 103, addCtrl: 1, editCtrl: 3 },
        { colName: 'time', aliasColName: '入职时间', dispType: 4 },
        { colName: 'image', aliasColName: '相片', dispType: 8 },
        { colName: 'addCtrl', aliasColName: '添加控制', dispType: 1 },
        { colName: 'showCtrl', aliasColName: '显示控制', dispType: 1 },
        { colName: 'editCtrl', aliasColName: '编辑控制', dispType: 1 },
        { colName: 'required', aliasColName: '是否必填', dispType: 1 },
        { colName: 'queryCtrl', aliasColName: '查询控制', dispType: 1 }],
      queryModel: {},
      selectVal: [
        {
          fld: 'job',
          dispVal: 'describe',
          values: [
            { describe: '点', typeName: 'Point' },
            { describe: '线', typeName: 'Line' },
            { describe: '面', typeName: 'Polygon' },
            { describe: '热力图', typeName: 'HeatMap' },
            { describe: '柱状图', typeName: 'GraphBar' },
            { describe: '饼状图', typeName: 'CircleBar' }
          ]
        }
      ],
      fldVal: []
    }
  },
  created () {
    this.getSelectVal()
  },
  methods: {
    getFormData (data) {
      console.log(this.model)
      this.$CDialog({
        title: '新增',
        component: <c-form ref='form'
          columns={this.columns}
          select-val={this.fldVal}
        ></c-form>,
        confirm: (instance, done) => {

        }
      })
    },
    getSelectVal () {
      this.selectVal.forEach(item => {
        if (item.values) {
          this.fldVal.push({
            [item.fld]: item.values.map(row => row[item.dispVal || 'typeName'])
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>

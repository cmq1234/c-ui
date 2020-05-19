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
      <c-table
        ref="table"
        :columns="columns"
        :load="load"
        :buttons="buttons"
        :button-click="callFunByName"
        :page-size="10"></c-table>
    </div>
  </div>
</template>

<script>
import curd from '../../util/system/curd'
export default {
  name: 'HelloWorld',
  mixins: [curd],
  data () {
    return {
      model: { job: '程序员' },
      columns: [
        { colName: 'name', aliasColName: '姓名', showCtrl: 1, dispType: 1 },
        { colName: 'id', aliasColName: 'ID', showCtrl: 1, dispType: 1 },
        { colName: 'img', aliasColName: '照片', showCtrl: 1, dispType: 8 },
        { colName: 'age', aliasColName: '年龄', showCtrl: 0, dispType: 1 },
        { colName: 'job', aliasColName: '工作类型', showCtrl: 1, dispType: 1 },
        { colName: 'sex', aliasColName: '性别', showCtrl: 1, dispType: 1 },
        { colName: 'class', aliasColName: '班级', showCtrl: 0, dispType: 1 },
        { colName: 'birth', aliasColName: '生日', showCtrl: 1, dispType: 1 },
        { colName: 'grade', aliasColName: '成绩', showCtrl: 1, dispType: 1 },
        { colName: 'addCtrl', aliasColName: '添加控制', showCtrl: 0, dispType: 3 },
        { colName: 'showCtrl', aliasColName: '显示控制', showCtrl: 0, dispType: 3 },
        { colName: 'editCtrl', aliasColName: '编辑控制', showCtrl: 1, dispType: 3 },
        { colName: 'required', aliasColName: '是否必填', showCtrl: 0, dispType: 3 },
        { colName: 'queryCtrl', aliasColName: '查询控制', showCtrl: 1, dispType: 3 }],
      buttons: [
        { id: 130100, buttonType: '表格上', title: '新增', click: 'create', buttonShowType: 'primary', dispOrder: 5 },
        { id: 130102, buttonType: '表格右', title: '操作2', click: 'oper1', buttonShowType: 'warning', dispOrder: 2 },
        { id: 130101, buttonType: '表格右', title: '操作1', click: 'oper1', buttonShowType: 'danger', dispOrder: 4 },
        { id: 130103, buttonType: '表格右', title: '操作3', click: 'oper1', buttonShowType: 'warning', dispOrder: 1 },
        { id: 130104, buttonType: '表格右', title: '操作按钮4', click: 'oper1', buttonShowType: 'warning', dispOrder: 1 },
        { id: 130105, buttonType: '表格右', title: '操作5', click: 'oper1', buttonShowType: 'warning', dispOrder: 1 }
      ],
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
    getSelectVal () {
      this.selectVal.forEach(item => {
        if (item.values) {
          this.fldVal.push({
            [item.fld]: item.values.map(row => row[item.dispVal || 'typeName'])
          })
        }
      })
    },
    load (query, resolve) {
      resolve([{ id: 1, name: '张', age: 20, job: 'student', sex: '男', class: '一班', grade: '100', birth: '19990101', addCtrl: '1', showCtrl: '1', queryCtrl: '1', editCtrl: '1', required: '1' },
        { id: 2, name: '李', age: 21, job: 'teacher', sex: '男', class: '二班', grade: '100', birth: '19990101', addCtrl: '1', showCtrl: '1', queryCtrl: '1', editCtrl: '1', required: '1' },
        { id: 3, name: '刘', age: 22, job: 'teacher', sex: '男', class: '三班', grade: '100', birth: '19990101', addCtrl: '1', showCtrl: '1', queryCtrl: '1', editCtrl: '1', required: '1', children: [{ id: 31, name: '王', age: 23, job: 'teacher', sex: '男', class: '四班', grade: '100', birth: '19990101', addCtrl: '1', showCtrl: '1', queryCtrl: '1', editCtrl: '1', required: '1' }] },
        { id: 2, name: '李', age: 21, job: 'teacher', sex: '男', class: '二班', grade: '100', birth: '19990101', addCtrl: '1', showCtrl: '1', queryCtrl: '1', editCtrl: '1', required: '1' },
        { id: 2, name: '李', age: 21, job: 'teacher', sex: '男', class: '二班', grade: '100', birth: '19990101', addCtrl: '1', showCtrl: '1', queryCtrl: '1', editCtrl: '1', required: '1' }
      ])
    },
    oper1 () {
      this.$message('操作成功')
    }
  }
}
</script>

<style scoped lang="scss">

</style>

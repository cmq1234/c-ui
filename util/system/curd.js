export default {
  methods: {
    callFunByName (func, rows) {
      try {
        this[func](rows)
      } catch (e) {
        console.log(e)
      }
    },
    create () {
      this.$CDialog({
        title: '新增',
        component: <c-form ref='form'
          columns={this.columns}
          select-val={this.fldVal}
        ></c-form>,
        confirm: (instance, done) => {
          this.$message('提交成功')
          done()
        }
      })
    },
    read () {

    },
    update () {

    },
    del () {

    }
  }
}

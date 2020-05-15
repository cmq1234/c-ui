<template>
  <div id="query">
    <el-form
      :label-width="labelWidth"
      :model="temp"
      :inline="true"
      :hide-required-asterisk="true"
      size="mini">
      <div>
        <template v-for="(column, index) in visibleColumns">
          <c-form-item
            v-if="index<3"
            :key="column[colName]"
            :column="column"
            :value="temp[column[colName]]"
            :formType="formType"
            :datePickerType="datePickerType"
            :selectVal="selectVal"
            @change="changeModel"
          >
          </c-form-item>
        </template>
        <template v-for="item in visibleColumns.slice(3)">
          <c-form-item
            v-show="formShow"
            :key="item[colName]"
            :column="item"
            :value="temp[item[colName]]"
            :formType="formType"
            :datePickerType="datePickerType"
            :selectVal="selectVal"
            @change="changeModel">
          </c-form-item>
        </template>
        <div :style=buttonClass style="display:inline-block" v-show="columns[0]">
          <el-button  type="primary" @click="doQuery" size="mini">查询</el-button>
          <el-button  type="primary" @click="resetForm()" size="mini">重置</el-button>
          <span class="el-dropdown-link" @click="queryHandleChange()" v-if="visibleColumns.length>3">
            {{queryChange}}<i class="el-icon-arrow el-icon--right" :class="queryClass"></i>
          </span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { SysFld } from '../../../util/system/SysFld'
import CFormItem from '../../CFormItem/src/CFormItem'
export default {
  name: 'CQuery',
  components: { CFormItem },
  props: {
    columns: {
      default: () => [],
      type: Array
    },
    selectVal: {
      default: () => [],
      type: Array
    },
    model: {
      type: Object,
      default: function () {
        return {}
      }
    },
    labelWidth: {
      type: String,
      default: 'auto'
    },
    onClick: Function,
    datePickerType: String
  },
  computed: {
    filterColumns: function () {
      const exclutedType = [
        SysFld.DISP_TYPE_VAL.PULLDOWN,
        SysFld.DISP_TYPE_VAL.NUMBER,
        SysFld.DISP_TYPE_VAL.DATEPICKER
      ]
      const arr = JSON.parse(JSON.stringify(this.columns))
      return arr.map(function (value) {
        if (value[SysFld.REQUIRED] === SysFld.REQUIRED_VAL.TRUE) {
          value[SysFld.REQUIRED] = SysFld.REQUIRED_VAL.FALSE
        }
        if (exclutedType.indexOf(value[SysFld.DISP_TYPE]) === -1) {
          value[SysFld.DISP_TYPE] = SysFld.DISP_TYPE_VAL.TEXT
        }
        return value
      })
    },
    visibleColumns: function () {
      return this.filterColumns.filter(item => item[SysFld.QUERY_CONTROLLER] !== SysFld.CONTROLLER_VAL.INVISIBLE)
    }
  },
  data () {
    return {
      temp: this.model,
      colName: SysFld.COLNAME,
      formType: SysFld.QUERY_CONTROLLER,
      queryChange: '展开',
      queryClass: 'el-icon-arrow-down',
      formShow: false,
      buttonClass: ''
    }
  },
  methods: {
    changeModel (key, value) {
      if (value === '' || value === -1) {
        delete this.temp[key]
      } else { this.temp[key] = value }
    },
    queryHandleChange () {
      if (this.queryChange === '展开') {
        this.queryChange = '收起'
        this.queryClass = 'el-icon-arrow-up'
        this.formShow = true
        this.buttonClass = 'float:right;'
      } else {
        this.queryChange = '展开'
        this.queryClass = 'el-icon-arrow-down'
        this.formShow = false
        this.buttonClass = ''
      }
    },
    doQuery () {
      const params = []
      for (const [key, value] of Object.entries(this.temp)) {
        const data = this.columns.filter(function (item) {
          return item.colName === key
        })
        if (data[0][SysFld.DISP_TYPE] === SysFld.DISP_TYPE_VAL.TEXT) {
          params.push({ field: key, type: 'like', value: value })
        } else if (data[0][SysFld.DISP_TYPE] === SysFld.DISP_TYPE_VAL.NUMBER) {
          params.push({ field: key, type: 'in', value: value })
        } else if (data[0][SysFld.DISP_TYPE] === SysFld.DISP_TYPE_VAL.DATEPICKER) {
          params.push({ field: key, type: '>=', value: value[0] })
          params.push({ field: key, type: '<=', value: value[1] })
        } else params.push({ field: key, type: 'like', value: value })
      }
      this.getFormValue(params)
    },
    getFormValue (params) {
      this.$emit('getQueryValue', params)
    },
    resetForm () {
      const params = []
      this.getFormValue(params)
    }
  }
}
</script>

<style scoped lang="scss">
  #query {
    .el-form--inline .el-form-item{
      margin-right: 0;
      width: 25%;
  }

    .el-form--inline .el-form-item__content {
      display: flex!important;
      margin-right: 20px;
  }

    .el-dropdown-link {
      margin-left: 15px;
      cursor: pointer;
      color: #409EFF;
      font: 400 12px Arial;
  }

    .el-icon-arrow {
      font-size: 12px;
      display: inline-block;
  }

    .el-form--inline .el-form-item__label{
      float: left;
  }
  }
</style>

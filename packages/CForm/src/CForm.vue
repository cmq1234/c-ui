<template>
  <div>
    <el-form
      :model="temp"
      :ref="id"
      :label-width="labelWidth"
      :inline="inline"
      :label-position="labelPosition"
      size="mini">
       <span v-for="column in columns" :key="column[colName]" :class="colClass">
          <c-form-item
            :column="column"
            :value="temp[column[colName]]"
            @change="changeModel"
            :rules="rules[column[colName]]"
            :formType="formType"
            :datePickerType="datePickerType"
            :select-val="selectVal"
          >
          </c-form-item>
       </span>
    </el-form>
  </div>
</template>

<script>
import { SysFld } from '../../../util/system/SysFld'

export default {
  name: 'CForm',
  props: {
    id: {
      type: String,
      default: 'form'
    },
    columns: {
      default: () => [],
      type: Array
    },
    selectVal: {
      default: () => [],
      type: Array
    },
    inline: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    labelPosition: String,
    labelWidth: {
      type: String,
      default: '80px'
    },
    col: {
      type: Number,
      default: 1
    },
    datePickerType: String,
    defaultVal: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formType: {
      type: String,
      default: function () {
        return SysFld[SysFld.FORM_TYPE_VAL.ADD]
      }
    }
  },
  computed: {
    /**
     * 支持两列form、三列form、四列form
     * @returns {string}
     */
    colClass: function () {
      if ([2, 3, 4].indexOf(this.col) > -1) {
        return `col-${24 / this.col}`
      }
      return ''
    }
  },
  data () {
    const model = {}
    this.columns.forEach(item => { model[item[SysFld.COLNAME]] = null })
    return {
      temp: Object.assign({}, model, this.defaultVal),
      colName: SysFld.COLNAME
    }
  },
  methods: {
    changeModel (key, value) {
      if (value === '' || value === -1) {
        delete this.temp[key]
      } else { this.temp[key] = value }
    },
    getModel () {
      return new Promise(resolve => {
        this.$refs[this.id].validate((valid) => {
          if (valid) resolve(this.temp)
        })
      })
    }
  }
}
</script>

<style scoped>
  .col-12 {
    display: inline-block;
    width: 50%;
  }

  .col-8 {
    display: inline-block;
    width: 33.33333%;
  }

  .col-6 {
    display: inline-block;
    width: 25%;
  }
</style>

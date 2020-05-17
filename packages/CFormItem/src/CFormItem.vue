<template>
  <el-form-item
    v-if="visible"
    :label="aliasColName+':'"
    :prop="colName"
    :rules="rule"
    >
    <component
      :is="type"
      :column="column"
      v-model="model"
      :placeholder="aliasColName"
      :disabled="disabled"
      :datePickerType="datePickerType"
      style="width:100%"
      :select-val="selectVal">
    </component>
  </el-form-item>
</template>

<script>
import { SysFld } from '../../../util/system/SysFld'
import CInput from '../../CInput/src/CInput'

// 校验电话
const checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error(this.t('sc.form.valid.phoneNull')))
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error(this.t('sc.form.valid.phoneError')))
    }
  }
}
// 校验邮箱
const checkEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(this.t('sc.form.valid.emailNull')))
  } else {
    if (value !== '') {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(value)) {
        callback(new Error(this.t('sc.form.valid.emailError')))
      }
    }
    callback()
  }
}
// 校验密码
const checkPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(this.t('sc.form.valid.dataNull')))
  } else if (value.length < 6) {
    callback(new Error(this.t('sc.form.valid.dataMinSize')))
  } else if (value.length > 16) {
    callback(new Error(this.t('sc.form.valid.dataMaxSize')))
  } else {
    callback()
  }
}
// 校验字符长度
const checkStrLen = (rule, value, callback) => {
  if (value && value.length > 200) {
    callback(new Error(this.t('sc.form.valid.dataLong')))
  } else {
    callback()
  }
}
export default {
  name: 'CFormItem',
  components: {
    CInput
  },
  props: {
    value: [String, Number],
    column: Object,
    rules: Object,
    formType: String,
    datePickerType: String,
    selectVal: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      model: this.value
    }
  },
  watch: {
    model: function () {
      this.$emit('change', this.colName, this.model)
    }
  },
  computed: {
    colName: function () {
      return this.column[SysFld.COLNAME]
    },

    aliasColName: function () {
      return this.column[SysFld.ALIAS_COLNAME]
    },
    // 是否显隐
    visible: function () {
      return this.column[this.formType] !== SysFld.CONTROLLER_VAL.INVISIBLE
    },
    // 是否可编辑
    disabled: function () {
      return this.column[this.formType] === SysFld.CONTROLLER_VAL.EDITABLE
    },
    // 类型检测
    type: function () {
      switch (this.column[SysFld.DISP_TYPE]) {
        case SysFld.DISP_TYPE_VAL.TEXT:
        case SysFld.DISP_TYPE_VAL.TEXTFIELD:
        case SysFld.DISP_TYPE_VAL.NUMBER:
          return 'c-input'
        case SysFld.DISP_TYPE_VAL.PULLDOWN:
          return 'c-select'
        // case SysFld.DISP_TYPE_VAL.SELECTIMAGE:
        //   return 'sc-select-image'
        // case SysFld.DISP_TYPE_VAL.SELECTICON:
        //   return 'sc-select-icon'
        case SysFld.DISP_TYPE_VAL.DATEPICKER:
          return 'c-date-picker'
        // case SysFld.DISP_TYPE_VAL.RADIOBOX:
        //   return 'sc-radio-group'
        // case SysFld.DISP_TYPE_VAL.CHECKBOX:
        //   return 'sc-checkbox-group'
        // case SysFld.DISP_TYPE_VAL.UPLOADFILE:
        // case SysFld.DISP_TYPE_VAL.UPLOADIMG:
        //   return 'sc-upload'
        default:
          return 'c-input'
      }
    },
    // 规则校验
    rule: function () {
      const rule = []
      if (this.column[SysFld.REQUIRED] === SysFld.REQUIRED_VAL.TRUE) {
        rule.push({ required: true, trigger: 'blur' })
      }
      switch (this.column[SysFld.DISP_TYPE]) {
        case SysFld.DISP_TYPE_VAL.NUMBER:
          rule.push({ type: 'number', trigger: 'blur' })
          break
        case SysFld.DISP_TYPE_VAL.PHONE:
          rule.push({ validator: checkPhone, trigger: 'blur' })
          break
        case SysFld.DISP_TYPE_VAL.MAIL:
          rule.push({ validator: checkEmail, trigger: 'blur' })
          break
        case SysFld.DISP_TYPE_VAL.PASSWORD:
          rule.push({ validator: checkPassword, trigger: 'blur' })
          break
        case SysFld.DISP_TYPE_VAL.TEXT:
        case SysFld.DISP_TYPE_VAL.TEXTFIELD:
          rule.push({ validator: checkStrLen, trigger: 'blur' })
          break
      }
      if (this.rules) {
        rule.concat(this.rules)
      }
      return rule
    }
  }
}
</script>

<style scoped>

</style>

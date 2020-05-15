<template>
  <el-input
    v-model="model"
    :placeholder="placeholder"
    :disabled="disabled"
    :type="type"
    :showPassword="showPassword">
  </el-input>
</template>

<script>
import { SysFld } from '../../../util/system/SysFld'
export default {
  name: 'CInput',
  props: {
    column: Object,
    value: [String, Number],
    placeholder: String,
    disabled: Boolean
  },
  data () {
    return {
      showPassword: false,
      model: this.value
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    type: function () {
      switch (this.column[SysFld.DISP_TYPE]) {
        case SysFld.DISP_TYPE_VAL.TEXT:
          return 'text'
        case SysFld.DISP_TYPE_VAL.PASSWORD:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.showPassword = true
          break
        case SysFld.DISP_TYPE_VAL.TEXTFIELD:
          return 'textarea'
        case SysFld.DISP_TYPE_VAL.NUMBER:
          return 'number'
        default:
          return 'text'
      }
    }
  },
  watch: {
    model: function () {
      if (this.type === 'number') {
        this.$emit('input', Number(this.model))
      } else {
        this.$emit('input', this.model)
      }
    }
  }
}
</script>

<style scoped>

</style>

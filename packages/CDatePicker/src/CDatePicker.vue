<template>
  <el-date-picker
    :type="datePickerType"
    v-model="model"
    :placeholder="placeholder"
    :disabled="disabled"
    format="yyyy/MM/dd HH:mm:ss"
    value-format="yyyy/MM/dd HH:mm:ss"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :default-time="['00:00:00', '23:59:59']">
  </el-date-picker>
</template>

<script>
export default {
  name: 'CDatePicker',
  data () {
    return {
      model: this.value
    }
  },
  props: {
    column: Object,
    value: [String, Array],
    placeholder: String,
    disabled: Boolean,
    datePickerType: {
      type: String,
      default: 'datetimerange'
    }
  },
  watch: {
    model: function () {
      this.$emit('input', this.model)
    }
  }
}
</script>

<style scoped>

</style>

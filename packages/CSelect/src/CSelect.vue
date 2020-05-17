<template>
  <el-select
    v-model="model"
    :placeholder="placeholder"
    :disabled="disabled"
    clearable>
    <template v-for="(item, index) in selectVal">
      <div v-if="item[colName]" :key="index">
        <el-option
          v-for="value in item[colName]"
          :key="value"
          :label="value"
          :value="value">
        </el-option>
      </div>
    </template>
  </el-select>
</template>

<script>
import { SysFld } from '../../../util/system/SysFld'
export default {
  name: 'CSelect',
  props: {
    column: Object,
    value: [String, Number],
    placeholder: String,
    disabled: Boolean,
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
  computed: {
    colName: function () {
      return this.column[SysFld.COLNAME]
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

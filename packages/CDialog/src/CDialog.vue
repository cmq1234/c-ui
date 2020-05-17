<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="attrs"
    :before-close="beforeDoClose">
    <slot></slot>
    <div slot="footer" class="dialog-footer" v-if="showFooter">
      <el-button
        :loading="cancelButtonLoading"
        size="small"
        @click.native="handleCancel"
        @keydown.enter="handleCancel">
        取消
      </el-button>
      <el-button
        type="primary"
        :loading="confirmButtonLoading"
        ref="confirm"
        size="small"
        @click.native="handleConfirm"
        @keydown.enter="handleConfirm">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CDialog',
  props: {},
  data () {
    return {
      visible: false,
      attrs: {},
      showFooter: true,
      cancelButtonLoading: false,
      confirmButtonLoading: false,
      cancelButtonText: '',
      confirmButtonText: '',
      beforeClose: null,
      cancel: null,
      confirm: null
    }
  },
  methods: {
    doClose () {
      this.visible = false
      document.body.removeChild(this.$el)
    },
    beforeDoClose (done) {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this, this.doClose)
      } else {
        done()
      }
    },
    handleCancel () {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this, this.doClose)
      }
      if (typeof this.cancel === 'function') {
        this.cancel(this, this.doClose)
      } else {
        this.doClose()
      }
    },
    handleConfirm () {
      if (typeof this.confirm === 'function') {
        this.confirm(this, this.doClose)
      }
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        document.body.removeChild(this.$el)
      }
    }
  }
}
</script>

<style scoped>

</style>

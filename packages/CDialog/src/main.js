import Vue from 'vue'
import Element from 'element-ui'
import msgboxVue from './CDialog'
import { isVNode } from 'element-ui/src/utils/vdom'

const defaults = {
  title: null,
  width: '',
  fullscreen: false,
  modal: true,
  modalAppendToBody: true,
  appendToBody: true,
  customClass: '',
  destroyOnClose: true
}
const MessageBoxConstructor = Vue.extend(msgboxVue)
let currentMsg, instance

const CDialog = function (options = {}) {
  if (Vue.prototype.$isServer) return
  Vue.use(Element)
  currentMsg = {
    options: Object.assign({}, defaults, CDialog.defaults, options)
  }
  showNextMsg(options.component)
  return instance
}

const showNextMsg = () => {
  initInstance()
  const options = currentMsg.options
  for (const [key, value] of Object.entries(options)) {
    // eslint-disable-next-line no-prototype-builtins
    if (defaults.hasOwnProperty(key)) {
      instance.attrs[key] = value
    } else {
      instance[key] = value
    }
  }
  if (isVNode(instance.component)) {
    instance.$slots.default = [instance.component]
    instance.component = null
  }
  Vue.nextTick(() => {
    instance.visible = true
  })
}
const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  })
}
export default CDialog

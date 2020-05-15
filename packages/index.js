import Element from 'element-ui'
import CForm from './CForm/index.js'
import CFormItem from './CFormItem/src/CFormItem'
import CQuery from './CQuery/src/CQuery'

const components = [
  CForm, CFormItem, CQuery
]

const install = function (Vue) {
  Vue.use(Element)
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  CForm,
  CFormItem,
  CQuery
}

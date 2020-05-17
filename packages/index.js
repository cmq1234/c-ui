import Element from 'element-ui'
import CForm from './CForm/index.js'
import CFormItem from './CFormItem/src/CFormItem'
import CQuery from './CQuery/src/CQuery'
import CSelect from './CSelect/src/CSelect'
import CDatePicker from './CDatePicker/src/CDatePicker'
import CDialog from './CDialog/index'

const components = [
  CForm, CFormItem, CQuery, CSelect, CDatePicker
]

const install = function (Vue) {
  Vue.use(Element)
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
  Vue.prototype.$CDialog = CDialog
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  CForm,
  CFormItem,
  CQuery,
  CSelect,
  CDatePicker,
  CDialog
}

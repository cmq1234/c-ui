import CInput from './src/input'

/* istanbul ignore next */
CInput.install = function (Vue) {
  Vue.component(CInput.name, CInput)
}

export default CInput

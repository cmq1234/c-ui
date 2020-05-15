import CQuery from './src/CQuery'

/* istanbul ignore next */
CQuery.install = function (Vue) {
  Vue.component(CQuery.name, CQuery)
}

export default CQuery

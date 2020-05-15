import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh-CN'
const messages = {
  en: Object.assign({}, elementEnLocale, enLocale),
  zh: Object.assign({}, elementZhLocale, zhLocale)
}
export default messages

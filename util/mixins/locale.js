import { t } from '../../util/locale'

export default {
  methods: {
    t (...args) {
      return t.apply(this, args)
    }
  }
}

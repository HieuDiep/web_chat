import { tDate } from "validation_t/src"
export default {
  methods: {
    parseDMY(_date) {
      if (!_date) {
        return ""
      }
      const dateObj = tDate.formatDateCustomize(_date)
      return `${dateObj.dd}/${dateObj.MM}/${dateObj.yyyy}`
    },
  },
}

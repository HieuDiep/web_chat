import { mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters({
      listUserGetter: "listUserGetter",
    }),
  },
  methods: {
    userById(_user) {
      if (!_user) {
        return {}
      }
      const result = this.listUserGetter.filter(
        (o) => String(_user.username) === `customer.${o.id}`,
      )
      // console.log(this.listUserGetter)
      return result && result.length ? result[0] : {}
    },
    userByUsernane(_username) {
      if (!_username) {
        return {}
      }
      const result = this.listUserGetter.filter(
        (o) => String(_username) === `customer.${o.id}`,
      )
      // console.log(this.listUserGetter)
      return result && result.length ? result[0] : {}
    },
  },
}

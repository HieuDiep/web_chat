const usersRepo = (axios) => {
  return {
    getAll(filterOptions = {}) {
      const body = {
        ...filterOptions,
        // include: filterOptions.include ? `${filterOptions.include},parts,parts.warehouse,parts.warehouse_off_airport_terminal` : "parts",
      }
      return axios
        .get(`/api/customer`, {
          params: body,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getDetail(_id) {
      return axios
        .get(`/api/users/${_id}`)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
  }
}
export default usersRepo

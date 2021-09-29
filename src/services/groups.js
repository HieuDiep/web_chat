const groupsRepo = (axios) => {
  return {
    getAllGroup() {
      // const body = {
      //   ...filterOptions,
      // };
      return axios
        .get(`api/customer/chat-groups?include=grades`)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
  }
}
export default groupsRepo

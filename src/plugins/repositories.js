import createRepository from "../repositories"

export default (ctx, inject) => {
  inject(
    "repositories",
    createRepository(ctx.$axios, ctx.$indexedDB, ctx.store),
  )
}

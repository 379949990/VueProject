export default {
  namespaced: true,
  state: {
    cartlist: []
  },
  mutations: {
    change_cart_list (state, data) {
      state.cartlist = data
    }
  },
  actions: {
  }
}

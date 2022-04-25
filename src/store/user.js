export default {
  state: {
    user: null,
    userId: null,
  },
  mutations: {
    UPDATE_USER(state, user) {
      // for (const key in user) {
      //   state[key] = user[key]
      // }
      localStorage.setItem('token',user.token)
      state.user = user || {};
      state.userId = user.User_Id || '';
    }
  },
  actions: {},
  getters: {}
};

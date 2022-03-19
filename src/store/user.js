export default {
    state: {
      userId: null,
    },
    mutations: {
      UPDATE_USER(state, user) {
        state.userId = user.userId || '';
      }
    },
    actions: {},
    getters: {}
  };
  
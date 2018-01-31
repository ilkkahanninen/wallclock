export default {
  state: {
    time: null,
  },

  actions: {
    updateTime() {
      this.dispatch('updateTime', new Date());
    },
  },

  reducers: {
    updateTime: (state, time) => ({ ...state, time }),
  },
};

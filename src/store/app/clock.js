import { bundle } from 'dwindler';

export default bundle({
  name: 'clock',

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
});

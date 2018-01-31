import iCal from 'ical';

export default {
  state: {
    calendars: {},
  },

  actions: {
    async loadCalendar(name, key) {
      iCal.fromURL(
        `https://eyfwuk0zn6.execute-api.us-east-2.amazonaws.com/prod/${key}`,
        null,
        (err, calendar) => {
          if (!err) {
            this.dispatch('calendarReceived', { calendar, name });
          }
        },
      );
    },
  },

  reducers: {
    calendarReceived: (state, { calendar, name }) => ({
      ...state,
      calendars: {
        ...state.calendars,
        [name]: calendar,
      },
    }),
  },
};

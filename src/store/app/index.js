import clock from './clock';
import weather from './weather';
import trains from './trains';
import calendar from './calendar';

export default {
  children: { calendar, clock, trains, weather },
};

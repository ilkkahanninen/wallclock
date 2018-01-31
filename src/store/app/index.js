import { bundle } from 'dwindler';
import clock from './clock';
import weather from './weather';
import trains from './trains';
import calendar from './calendar';

export default bundle({
  children: { calendar, clock, trains, weather },
});

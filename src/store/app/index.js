import { bundle } from 'dwindler';
import clock from './clock';
import weather from './weather';
import trains from './trains';

export default bundle({
  name: 'app',
  children: [clock, weather, trains],
});

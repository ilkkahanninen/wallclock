import { bundle } from 'dwindler';
import clock from './clock';
import weather from './weather';

export default bundle({
  name: 'app',
  children: [clock, weather],
});

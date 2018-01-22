import React from 'react';

const COLD_COLOR = '#2196F3';
const WARM_COLOR = '#E91E63';

const Temperature = ({ value, precision, freezeLimit, heatLimit }) => {
  const warn =
    (freezeLimit != null && value <= freezeLimit) ||
    (heatLimit != null && value >= heatLimit);
  const color = value > 0 ? WARM_COLOR : COLD_COLOR;
  const style = warn
    ? {
        backgroundColor: color,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
      }
    : {
        color,
      };
  return (
    <div style={style}>
      {value != null ? `${parseFloat(value).toFixed(precision)}°C` : '–'}
    </div>
  );
};

Temperature.defaultProps = {
  precision: 0,
};

export default Temperature;

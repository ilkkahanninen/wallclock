import React from 'react';
import './Centered.css';

const Centered = ({
  className,
  children,
  vertical,
  width,
  height,
  ...rest
}) => (
  <div
    className={`Centered ${vertical ? 'Centered__vertical' : ''} ${className ||
      ''}`}
    style={{
      width,
      height,
    }}
    {...rest}
  >
    {children}
  </div>
);

Centered.defaultProps = {
  vertical: false,
  width: '100vw',
  height: 'auto',
};

export default Centered;

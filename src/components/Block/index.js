import React from 'react';
import './Block.css';

const Block = ({ className, children, vertical, width, height, ...rest }) => (
  <div
    className={`Block__root ${vertical ? 'Block__vertical' : ''} ${className || ''}`}
    style={{
      width: `${width * 100 / 12}%`,
      height: `${height * 100 / 12}vh`,
    }}
    {...rest}
  >
    {children}
  </div>
);

Block.defaultProps = {
  vertical: false,
  width: 12,
  height: 4,
};

export default Block;

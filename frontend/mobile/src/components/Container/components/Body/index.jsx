import React, { forwardRef } from 'react';

import cs from 'classnames';

const Body = forwardRef(({ className, children }, ref) => {
  return (
    <div ref={ref} id="cherry-body" className={cs('px-4', className)}>
      {children}
    </div>
  );
});

export default Body;

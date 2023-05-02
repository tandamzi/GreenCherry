import React, { forwardRef } from 'react';

import classnames from 'classnames';

const Body = forwardRef(({ className, children }, ref) => {
  return (
    <div ref={ref} id="greencherry-body" className={classnames(className)}>
      {children}
    </div>
  );
});

export default Body;

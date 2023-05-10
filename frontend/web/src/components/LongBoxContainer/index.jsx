import React from 'react';

import classnames from 'classnames';

const LongBoxContainer = ({ children, className }) => {
  return (
    <div
      className={classnames(
        'bg-secondary text-bgcolor w-full text-3xl text-center rounded-full py-2 shadow-second',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LongBoxContainer;

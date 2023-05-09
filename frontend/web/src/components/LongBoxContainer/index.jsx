import React from 'react';

const LongBoxContainer = ({ children }) => {
  return (
    <div className="bg-secondary text-bgcolor w-full text-3xl text-center rounded-full py-2 shadow-second">
      {children}
    </div>
  );
};

export default LongBoxContainer;

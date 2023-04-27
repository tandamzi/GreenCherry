import React from 'react';

const Spinner = ({ content }) => {
  return (
    <div>
      <p className="text-center font-bold text-4xl mt-20">{content}</p>
    </div>
  );
};

Spinner.defaultProps = {
  content: '로딩중.....♡',
};

export default Spinner;

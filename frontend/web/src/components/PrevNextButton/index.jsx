import React from 'react';

const PrevNextButton = () => {
  return (
    <div className="absolute bottom-0 text-xl left-1/2 -translate-x-1/2">
      <button
        type="button"
        className="bg-secondary text-bgcolor px-3 py-2 rounded-xl mr-16"
      >
        이전
      </button>
      <button
        type="button"
        className="bg-secondary text-bgcolor px-3 py-2 rounded-xl"
      >
        다음
      </button>
    </div>
  );
};

export default PrevNextButton;

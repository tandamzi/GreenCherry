import React from 'react';

import changeDate from '@/utils/changeDate';

const PrevNextButton = ({ date, dateHandle }) => {
  const handlePrevClick = () => {
    const newDate = changeDate(date, -1);
    dateHandle(newDate);
  };

  const handleNextClick = () => {
    const newDate = changeDate(date, 1);
    dateHandle(newDate);
  };
  return (
    <div className="absolute bottom-0 text-xl left-1/2 -translate-x-1/2">
      <button
        type="button"
        className="bg-secondary text-bgcolor px-3 py-2 rounded-xl mr-16"
        onClick={handlePrevClick}
      >
        이전
      </button>
      <button
        type="button"
        className="bg-secondary text-bgcolor px-3 py-2 rounded-xl"
        onClick={handleNextClick}
      >
        다음
      </button>
    </div>
  );
};

export default PrevNextButton;

import React from 'react';

const CherryInput = ({ title, data, value, onChange, onFocus, onBlur }) => {
  return (
    <div className="flex justify-between py-5 items-center tablet:flex-col">
      <h2 className="text-2xl mr-14 tablet:mr-0 tablet:mb-1">{title}</h2>
      <input
        name={data}
        type="number"
        className="text-2xl w-60 border border-solid py-1 px-3 rounded-lg border-line text-primaryfont"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        min={0}
      />
    </div>
  );
};

export default CherryInput;

import React from 'react';

const CherryInput = ({ title, data, onChange }) => {
  return (
    <div className="flex justify-between py-5 items-center">
      <h2 className="text-2xl mr-14">{title}</h2>
      <input
        name={data}
        type="number"
        className="text-2xl w-60 border border-solid py-1 px-3 rounded-lg border-line text-primaryfont"
        onChange={onChange}
        min={0}
      />
    </div>
  );
};

export default CherryInput;

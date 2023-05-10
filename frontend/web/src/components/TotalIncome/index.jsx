import React from 'react';

const TotalIncome = ({ price }) => {
  return (
    <div className="text-3xl border-b-2 border-b-line max-w-4xl flex justify-between font-sans mt-5">
      <p>총 수입</p>
      <p>{price}원</p>
    </div>
  );
};

export default TotalIncome;

import React, { useState, useEffect } from 'react';

import AllergyButton from '@/components/AllergyButton';
import { getAllergy } from '@/utils/api/store';

const StoreAllergyModify = ({
  itemModifyState,
  content,
  handleContentChange,
}) => {
  const handleContentInput = e => {
    handleContentChange(e.target.value);
  };
  const [allergyIdList, setAllergyIdList] = useState([]);
  const [allergyList, setAllergyList] = useState([]);
  const handleAllergyBtnClick = e => {
    const { value } = e.target;
    if (allergyIdList.includes(value)) {
      setAllergyIdList(allergyIdList.filter(allergyId => allergyId !== value));
    } else {
      setAllergyIdList([...allergyIdList, value]);
    }
  };
  // console.log(content);
  useEffect(() => {
    getAllergy().then(data => setAllergyList(data));
  }, []);

  return (
    <div>
      {itemModifyState ? (
        allergyList.map((allergy, index) => {
          return (
            <AllergyButton
              value={allergy.id}
              key={allergy.id}
              text={allergy.name}
              onClick={handleAllergyBtnClick}
              selected={allergyIdList.includes(allergy.id.toString())}
            />
          );
        })
      ) : (
        <div>
          {content.map(item => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreAllergyModify;

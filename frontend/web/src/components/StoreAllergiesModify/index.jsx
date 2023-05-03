import React from 'react';

import AllergiButton from '@/components/Button/AllergiButton';

const StoreAllergiModify = ({
  itemModifyState,
  disabled,
  content,
  handleContentChange,
}) => {
  const handleItemClick = item => {
    if (disabled) return;
    handleContentChange(item);
  };
  return (
    <div>
      {content.map(item => {
        return (
          <AllergiButton
            disabled={disabled}
            text={item.name}
            onClick={handleItemClick}
          />
        );
      })}
    </div>
  );
};

export default StoreAllergiModify;

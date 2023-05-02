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
      {content.map((item, index) => {
        return <button type="button">{item.name}</button>;
      })}
    </div>
  );
};

export default StoreAllergiModify;

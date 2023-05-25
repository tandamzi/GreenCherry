const StoreInputModify = ({
  itemModifyState,
  content,
  handleContentChange,
}) => {
  const handleContentInput = e => {
    handleContentChange(e.target.value);
  };
  return (
    <div>
      {itemModifyState ? (
        <textarea
          value={content}
          onChange={handleContentInput}
          className="w-full border-none outline-none"
        />
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
};

export default StoreInputModify;

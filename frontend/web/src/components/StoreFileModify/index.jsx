import Image from 'next/image';

const StoreFileModify = ({ itemModifyState, content, handleContentChange }) => {
  const handleContentInput = e => {
    handleContentChange(e.target.value);
  };

  return (
    <div>
      {itemModifyState ? (
        <input type="file" value={null} onChange={handleContentInput} />
      ) : (
        content.map(item => <Image key={item.id} src={item.url} />)
      )}
    </div>
  );
};

export default StoreFileModify;

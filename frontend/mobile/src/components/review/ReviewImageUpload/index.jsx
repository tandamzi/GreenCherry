import Image from 'next/image';

const ReviewImageUpload = ({ tag }) => {
  return (
    <div type="input" className="bg-disabled">
      <input type="file" className="bg-secondaryfont invisible" />
      <p>+</p>
    </div>
  );
};

export default ReviewImageUpload;

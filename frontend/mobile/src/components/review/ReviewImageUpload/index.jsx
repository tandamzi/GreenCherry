/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { useRef, useState } from 'react';

import classNames from 'classnames';
import Image from 'next/image';

const ReviewImageUpload = ({ id, imageList, setImageList }) => {
  const fileInputRef = useRef(null);
  const [isSelect, setIsSelect] = useState(false);
  const [imgFile, setImgFile] = useState(
    require('../../../../public/assets/Images/default-review.png'),
  );

  const handleImageList = (reqId, image) => {
    if (imageList[reqId]) {
      imageList[reqId] = image;
      setImageList(imageList);
    } else {
      setImageList([...imageList, image]);
    }
  };

  const handleButtonClick = event => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = event => {
    const reader = new FileReader();

    reader.onload = ({ target }) => {
      fileInputRef.current.src = target.result;
      setIsSelect(true);
      setImgFile(target.result);
    };
    reader.readAsDataURL(fileInputRef.current.files[0]);
    const selectedFile = event.target.files[0];
    handleImageList(id, event.target.files);
  };

  return (
    <div className="relative mr-4">
      <div>
        <Image
          src={imgFile}
          alt="프로필 이미지"
          onClick={handleButtonClick}
          width={100}
          height={100}
        />
      </div>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        name="file"
      />
    </div>
  );
};

export default ReviewImageUpload;

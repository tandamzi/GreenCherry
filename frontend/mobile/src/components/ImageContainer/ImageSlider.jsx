import React from 'react';

import Image from 'next/image';

import style from './index.module.scss';

const ImageSlider = ({ images, onClick, name }) => {
  return (
    <div className={(style['image-container'], 'flex overflow-x-auto w-full')}>
      {images.map((image, index) => (
        <div
          key={index}
          className="cursor-pointer relative bg-itembg mr-1 p-1 rounded-md w-32 h-32 flex-shrink-0"
        >
          <Image onClick={onClick} src={image} alt={name} fill />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;

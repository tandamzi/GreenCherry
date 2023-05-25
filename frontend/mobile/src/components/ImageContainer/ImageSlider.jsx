import React from 'react';

import cn from 'classnames';
import Image from 'next/image';

import style from './index.module.scss';

const ImageSlider = ({
  images,
  onClick,
  name,
  width,
  height,
  className,
  ...props
}) => {
  return (
    <div className={(style['image-container'], 'flex overflow-x-auto w-full')}>
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            'cursor-pointer relative bg-itembg mr-1 p-1 rounded-md flex-shrink-0',
          )}
          style={{ width, height }}
        >
          <Image
            className={className}
            onClick={onClick}
            src={image}
            alt={name}
            fill
            responsive
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;

import React from 'react';

import cn from 'classnames';
import Image from 'next/image';

const IconButton = ({
  iconUrl,
  width,
  height,
  label,
  className,
  onClick,
  ...props
}) => {
  return (
    <button className={className} type="button" onClick={onClick}>
      <Image
        className={cn('mb-2')}
        src={iconUrl}
        width={width}
        height={height}
      />
      <span>{label}</span>
    </button>
  );
};

export default IconButton;

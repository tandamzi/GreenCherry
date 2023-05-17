import { useState } from 'react';
import YouTube from 'react-youtube';

import store1 from '@public/assets/testImage/store1.png';
import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import style from './index.module.scss';

import clientHttp from '@/utils/csr/clientHttp';

const ShortComponent = ({ shortInfo, width, height }) => {
  const opts = {
    height,
    width,
    playerVars: {
      controls: 0,
      loop: 1,
      disablekb: 1,
      autohide: 0,
      autoplay: 0,
      fs: 0,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
    },
  };

  return (
    <div className="w-fit">
      <div
        className={(style['image-container'], 'flex overflow-x-auto w-full')}
      >
        <YouTube opts={opts} videoId="OLHmy0ZdWyY" />
        {/* {shortInfo.items.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              'cursor-pointer relative mr-1 p-1 rounded-xl flex-shrink-0',
            )}
            style={{ width, height }}
          >
            <YouTube opts={opts} videoId="OLHmy0ZdWyY" />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ShortComponent;

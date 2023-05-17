import YouTube from 'react-youtube';

import cn from 'classnames';

import style from './index.module.scss';

const ShortComponent = ({ shortInfo, width, height }) => {
  const opts = {
    width,
    height,
    playerVars: {
      rel: 0,
      autoplay: 0,
      modestbranding: 1,
      iv_load_policy: 3,
    },
  };

  return (
    <div className={style['youtube-container']}>
      {shortInfo.items.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            'cursor-pointer overflow-x-scroll relative flex-shrink-0',
            style['rounded-video-container'],
          )}
        >
          <YouTube
            key={item.id.videoId}
            className={style.player}
            opts={opts}
            videoId={item.id.videoId}
          />
        </div>
      ))}
    </div>
  );
};

export default ShortComponent;

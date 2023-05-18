import YouTube from 'react-youtube';

import cn from 'classnames';

import style from './index.module.scss';

const ShortComponent = ({ shortInfo, width, height }) => {
  const opts = {
    width,
    height,
    playerVars: {
      rel: 0,
      controls: 0,
      modestbranding: 1,
      autoplay: 0,
      loop: 1,
      iv_load_policy: 3,
    },
  };

  return (
    <div className={style['youtube-container']}>
      {shortInfo.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            'cursor-pointer relative flex-shrink-0',
            style['rounded-video-container'],
          )}
        >
          <YouTube
            key={item.videoId}
            className={style.player}
            opts={opts}
            videoId={item.videoId}
          />
        </div>
      ))}
    </div>
  );
};

export default ShortComponent;

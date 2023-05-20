import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CgSoftwareUpload } from 'react-icons/cg';

import Image from 'next/image';

import style from './index.module.scss';

const InstallPrompt = () => {
  const [isShown, setIsShown] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    setIsIOS(isDeviceIOS);

    const handleBeforeInstallPrompt = e => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsShown(true); // 'beforeinstallprompt' 이벤트가 발생했으므로 PWA가 설치되지 않았음을 알 수 있습니다.
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleClick = async () => {
    setIsShown(false);
    if (!deferredPrompt) {
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setIsShown(false);
  };

  if (!isIOS && !isShown) {
    return null;
  }

  return (
    <>
      <div className={style.backdrop} />
      <div className={style['install-prompt']}>
        {isIOS ? (
          <div className={style['install-container']}>
            <Image
              src="/assets/logo/cherryLogoShadowRemove.svg"
              width={69}
              height={69}
              alt="greencherry main logo"
            />
            <div className="text-center">
              <span className="text-secondary font-bold">GreenCherry</span>
              는 앱에서 원활한 사용을 할 수 있습니다.
              <br />
            </div>
            <div className="flex text-xl">
              <CgSoftwareUpload size={24} />를 클릭하여 홈 화면에 추가하기를
              통해 설치를 해주세요
            </div>
          </div>
        ) : (
          <div className={style['install-container']}>
            <Image
              src="/assets/logo/cherryLogoShadowRemove.svg"
              width={69}
              height={69}
              alt="greencherry main logo"
            />
            <div className="text-center">
              <span className="text-secondary font-bold">GreenCherry</span>
              는 앱에서 원활한 사용을 할 수 있습니다.
              <br />
              <span className="text-xl">설치하시겠습니까?</span>
            </div>
            <button
              type="button"
              onClick={handleClick}
              className={style['install-btn']}
            >
              Install App
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={handleClose}
          className={style['close-btn']}
        >
          <AiOutlineClose size={24} />
        </button>
      </div>
    </>
  );
};

export default InstallPrompt;

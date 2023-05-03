import React, { useRef, useEffect } from 'react';

import useResizeObserver from '@react-hook/resize-observer';
import cs from 'classnames';

import style from './index.module.scss';

const useSizeHeight = target => {
  const [size, setSize] = React.useState();

  React.useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect().height);
  }, [target]);

  useResizeObserver(target, entry => setSize(entry.contentRect.height));

  return size;
};
const Footer = ({ className, children }) => {
  const footerRef = useRef();

  const height = useSizeHeight(footerRef);

  // cherry-body에 footer의 높이만큼 주되 32px 정도를 여분으로 더 줍니다.
  useEffect(() => {
    const bodyRef = document.getElementById('cherry-body');
    if (bodyRef) {
      bodyRef.style.marginBottom = `${height + 32}px`;
    }
  }, [height]);

  return (
    <div
      ref={footerRef}
      id="cherry-footer"
      className={cs(
        'fixed m-0 rounded-3xl w-3/4 bg-bgcolor mb-5',
        style['cherry-footer'],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Footer;

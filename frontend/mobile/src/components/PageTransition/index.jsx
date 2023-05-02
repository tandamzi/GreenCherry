import React from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import { useRouter } from 'next/router';

const TIMEOUT = 400;
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `translateX(100px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `translateX(0px)`,
    animation: 'blink .3s linear 2',
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `translateX(-100px)`,
  },
};
const PageTransition = ({ children }) => {
  const router = useRouter();
  return React.createElement(
    TransitionGroup,
    { style: { position: 'relative' } },
    React.createElement(
      Transition,
      {
        key: router.pathname,
        timeout: {
          enter: TIMEOUT,
          exit: TIMEOUT,
        },
      },
      status =>
        React.createElement(
          'div',
          { style: { ...getTransitionStyles[status] } },
          children,
        ),
    ),
  );
};
export default PageTransition;

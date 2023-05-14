import classnames from 'classnames';

import Body from '@/components/Container/components/Body';

const PaddingZeroBody = ({ className, children, ref }) => {
  return (
    <Body
      ref={ref}
      className={classnames(
        'flex flex-col items-center justify-center',
        className,
      )}
    >
      {children}
    </Body>
  );
};

export default PaddingZeroBody;

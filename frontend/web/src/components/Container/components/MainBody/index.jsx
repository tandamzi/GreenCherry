import classnames from 'classnames';

import Body from '@/components/Container/components/Body';

const MainBody = ({ className, children, ref }) => {
  return (
    <Body
      ref={ref}
      className={classnames(
        'flex flex-col items-center py-32 w-fill m-auto max-w-4xl',
        className,
      )}
    >
      {children}
    </Body>
  );
};

export default MainBody;

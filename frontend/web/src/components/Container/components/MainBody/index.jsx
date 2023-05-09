import classnames from 'classnames';

import Body from '@/components/Container/components/Body';

const MainBody = ({ className, children, ref }) => {
  return (
    <Body
      ref={ref}
      className={classnames('flex flex-col items-center py-32', className)}
    >
      {children}
    </Body>
  );
};

export default MainBody;

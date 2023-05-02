import classnames from 'classnames';

import Body from '@/components/Container/components/Body';

const MainBody = ({ className, children, ref }) => {
  return (
    <Body
      ref={ref}
      className={classnames('px-64', 'py-32', 'h-screen', className)}
    >
      {children}
    </Body>
  );
};

export default MainBody;

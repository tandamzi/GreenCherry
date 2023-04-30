import classnames from 'classnames';

import Body from '@/components/Container/components/Body';

const MainBody = ({ className, children, ref }) => {
  return (
    <Body ref={ref} className={classnames('px-32', 'py-7', className)}>
      {children}
    </Body>
  );
};

export default MainBody;

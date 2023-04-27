import cs from 'classnames';

import Body from '../Body';

const MainBody = ({ className, children, ref }) => {
  return (
    <Body ref={ref} className={cs('px-4', 'pb-8', className)}>
      {children}
    </Body>
  );
};

export default MainBody;

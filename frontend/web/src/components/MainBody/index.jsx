import classnames from 'classnames';

import Body from '@/components/Body';

const MainBody = ({ className, children }) => {
  return <Body className={classnames(className)}>{children}</Body>;
};

export default MainBody;

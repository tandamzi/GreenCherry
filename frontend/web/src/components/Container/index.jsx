import classnames from 'classnames';

import Body from '@/components/Body';
import MainBody from '@/components/MainBody';
import MainHeader from '@/components/MainHeader';

const Container = ({ children, className }) => {
  return (
    <div id="devday-container" className={classnames(className)}>
      {children}
    </div>
  );
};

Container.MainHeader = MainHeader;
Container.Body = Body;
Container.MainBody = MainBody;

export default Container;

import cs from 'classnames';

import Footer from '../Footer';

const MainFooter = ({ className, children }) => {
  return <Footer className={cs('h-16 max-h-20', className)}>{children}</Footer>;
};

export default MainFooter;

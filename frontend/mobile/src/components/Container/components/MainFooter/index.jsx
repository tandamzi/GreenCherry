import cs from 'classnames';

import Footer from '../Footer';

const MainFooter = ({ className, children, position }) => {
  return (
    <Footer className={cs('h-16 max-h-20', className)} position={position}>
      {children}
    </Footer>
  );
};

export default MainFooter;

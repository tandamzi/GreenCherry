import classnames from 'classnames';

const Header = ({ children, className }) => {
  return <div className={classnames('h-16 px-4', className)}>{children}</div>;
};
export default Header;

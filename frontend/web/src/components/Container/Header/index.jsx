import classnames from 'classnames';

const Header = ({ children, className }) => {
  return <div className={classnames(className)}>{children}</div>;
};
export default Header;

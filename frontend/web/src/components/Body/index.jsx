import classnames from 'classnames';

const Body = ({ classname, children }) => {
  return <div className={classnames(classname)}>{children}</div>;
};

export default Body;

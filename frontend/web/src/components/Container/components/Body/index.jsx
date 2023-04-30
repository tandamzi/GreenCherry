import classnames from 'classnames';

const Body = ({ classname, children }, ref) => {
  return (
    <div ref={ref} className={classnames(classname)}>
      {children}
    </div>
  );
};

export default Body;

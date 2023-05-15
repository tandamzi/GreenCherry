import classnames from 'classnames';

import Body from '@/components/Container/components/Body';

const MainBody = ({ className, children, ref }) => {
  return (
    <Body
      ref={ref}
      className={classnames(
        'pt-32 pb-10 flex flex-col items-center  justify-center',
        className,
      )}
    >
      {children}
    </Body>
  );
};

export default MainBody;

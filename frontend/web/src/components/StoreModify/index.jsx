import { TiPencil } from 'react-icons/ti';

import classnames from 'classnames';

const StoreModify = ({ title, children, type }) => {
  // TODO: store에 modify 상태 저장
  const modify = {
    state: false,
    type: 'description',
  };

  const handlePencilClick = () => {
    // TODO: store modify 상태 state: true, type: type으로 변경
    // console.log('PencilClick 클릭');
  };

  const handleModifyClick = () => {
    // TODO: modify 요청 후 store modify 초기화
    // console.log('ModifyClick 클릭');
  };

  const handleCancelClick = () => {
    // TODO: store modify 초기화
    // console.log('CancelClick 클릭');
  };

  return (
    <div className="py-3">
      <div className={classnames('flex', 'items-center', 'justify-between')}>
        <div className={classnames('flex', 'items-center')}>
          <h3 className={classnames('font-thin', 'text-2xl', 'mb-2')}>
            {title}
          </h3>
          {!modify.state && <TiPencil size={26} onClick={handlePencilClick} />}
        </div>
        {modify.state && type === modify.type && (
          <div
            className={classnames('font-thin', 'text-xl', 'text-right', 'flex')}
          >
            <button type="button" className="mr-2" onClick={handleModifyClick}>
              수정하기
            </button>
            <button type="button" onClick={handleCancelClick}>
              취소하기
            </button>
          </div>
        )}
      </div>
      <div
        className={classnames(
          modify.state && type === modify.type
            ? 'border-solid border text-2xl'
            : 'text-2xl',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default StoreModify;

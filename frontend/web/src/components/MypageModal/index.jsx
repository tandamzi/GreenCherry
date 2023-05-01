import React from 'react';

import classnames from 'classnames';

import Modal from '@/components/Modal';
import StoreModify from '@/components/StoreModify';

const MypageModal = ({ isOpen, onClose }) => {
  const modify = {
    state: false,
    type: 'description',
  };
  const data = {
    discription: '안녕아녕',
    cherryDescription: '메롱',
  };
  const category = [
    { title: '가게 소개글', type: 'description' },
    { title: '체리박스 소개글', type: 'cherryDescription' },
  ];

  const handleChange = () => {
    // console.log('handleChange');
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={classnames('w-2/3', 'h-5/6', 'px-40', 'py-11')}
    >
      <h2 className="text-center text-4xl">내 가게</h2>
      <div>
        {category.map(item => {
          // type === 'allergy'&& return(div);
          return (
            <StoreModify title={item.title} type={item.type}>
              {modify.state && item.type === modify.type && (
                <textarea onChange={handleChange} />
              )}
            </StoreModify>
          );
        })}
      </div>
    </Modal>
  );
};

export default MypageModal;

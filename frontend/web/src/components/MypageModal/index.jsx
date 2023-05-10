import React from 'react';

import classnames from 'classnames';

import Modal from '@/components/Modal';
import StoreModify from '@/components/StoreModify';
import useMember from '@/hooks/memberHook';

const MypageModal = () => {
  const { myStoreModalOpen, openMyStoreModal, closeMyStoreModal } = useMember();

  const category = [
    { title: '가게 소개글', type: 'storeDescription' },
    { title: '체리박스 소개글', type: 'cherryboxDescription' },
    { title: '인스타그램', type: 'instagram' },
    // { title: '알레르기 재료', type: 'allergies' },
  ];

  return (
    <Modal
      isOpen={myStoreModalOpen}
      onClose={closeMyStoreModal}
      className="w-2/3 h-5/6 px-40 py-11"
    >
      <h2 className="text-center text-4xl">내 가게</h2>
      <div>
        {category.map((item, index) => {
          return (
            <StoreModify key={index} title={item.title} type={item.type} />
          );
        })}
      </div>
    </Modal>
  );
};

export default MypageModal;

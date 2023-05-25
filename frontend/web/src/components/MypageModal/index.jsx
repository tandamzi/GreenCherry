import React, { useEffect } from 'react';

import classnames from 'classnames';

import Modal from '@/components/Modal';
import StoreModify from '@/components/StoreModify';
import useMember from '@/hooks/memberHook';
import useModal from '@/hooks/modalHook';
import useStore from '@/hooks/storeHook';
import { getModifiable } from '@/utils/api/store';

const MypageModal = () => {
  const { memberAttributes } = useMember();

  const { myStoreModalOpen, openMyStoreModal, closeMyStoreModal } = useModal();

  const { setModifiable } = useStore();

  const category = [
    { title: '가게 소개글', type: 'storeDescription' },
    { title: '체리박스 소개글', type: 'cherryBoxDescription' },
    { title: '인스타그램', type: 'instagram' },
    // { title: '사진', type: 'images' },
    // { title: '알레르기 재료', type: 'allergies' },
  ];

  useEffect(() => {
    if (myStoreModalOpen) {
      getModifiable(memberAttributes.storeId).then(res => {
        setModifiable(res);
      });
    }
  }, [myStoreModalOpen]);

  return (
    <Modal
      isOpen={myStoreModalOpen}
      onClose={closeMyStoreModal}
      className="w-2/3 h-5/6 px-40 py-11 tablet:w-full tablet:px-1"
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

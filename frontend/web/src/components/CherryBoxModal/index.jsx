import React, { useState } from 'react';

import CherryInput from '@/components/CherryInput';
import Modal from '@/components/Modal';
import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';
import { putCherryBox } from '@/utils/api/store';

const CherryBoxModal = () => {
  const {
    cherryBoxRegisterModalOpen,
    openCherryBoxRegisterModal,
    closeCherryBoxRegisterModal,
  } = useMember();

  const { openStore } = useStore();

  const [cherryBox, setCherryBox] = useState({
    totalPriceBeforeDiscount: 0,
    quantity: 0,
    discountRate: 0,
    pricePerCherryBox: 0,
  });

  const cherryBoxDatas = [
    {
      title: '정가 총 가격',
      data: 'totalPriceBeforeDiscount',
    },
    {
      title: '체리박스 수량',
      data: 'quantity',
    },
    {
      title: '할인율',
      data: 'discountRate',
    },
    {
      title: '체리박스 개당가격',
      data: 'pricePerCherryBox',
    },
  ];

  const handleCherryBoxChange = e => {
    const { name, value } = e.target;
    setCherryBox({
      ...cherryBox,
      [name]: value,
    });
  };

  const handleRegisterBtnClick = () => {
    // TODO: 값들 잘 넣어주기
    putCherryBox({
      /*       memberId: 12,
      quantity: 11,
      totalPriceBeforeDiscount: 30000,
      discountRate: 11,
      pricePerCherryBox: 1111, */
    });
    openStore();
    closeCherryBoxRegisterModal();
  };

  return (
    <Modal
      isOpen={cherryBoxRegisterModalOpen}
      onClose={closeCherryBoxRegisterModal}
      className="p-16 flex flex-col items-center"
    >
      <h1 className="text-center text-3xl mb-10">오늘의 체리박스 등록</h1>
      <div>
        {cherryBoxDatas.map((cherryBoxData, index) => (
          <CherryInput
            key={index}
            title={cherryBoxData.title}
            data={cherryBoxData.data}
            onChange={handleCherryBoxChange}
          />
        ))}
      </div>
      <button
        type="button"
        className="text-3xl text-bgcolor bg-secondary w-60 h-12 rounded-2xl mt-10"
        onClick={handleRegisterBtnClick}
      >
        판매시작
      </button>
    </Modal>
  );
};

export default CherryBoxModal;

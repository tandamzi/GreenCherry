import React, { useState, useEffect } from 'react';

import CherryInput from '@/components/CherryInput';
import Modal from '@/components/Modal';
import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';
import { putCherryBox } from '@/utils/api/store';

const CherryBoxModal = () => {
  const {
    memberAttributes,
    cherryBoxRegisterModalOpen,
    openCherryBoxRegisterModal,
    closeCherryBoxRegisterModal,
  } = useMember();

  const { openStore } = useStore();

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

  const [cherryBox, setCherryBox] = useState({
    totalPriceBeforeDiscount: 0,
    quantity: 0,
    discountRate: 0,
    pricePerCherryBox: 0,
  });

  const [userModified, setUserModified] = useState({
    discountRate: false,
    pricePerCherryBox: false,
  });
  const handleCherryBoxChange = e => {
    const { name, value } = e.target;
    const updatedCherryBox = {
      ...cherryBox,
      [name]: value,
    };

    // Update userModified state
    const updatedUserModified = {
      discountRate: name === 'discountRate',
      pricePerCherryBox: name === 'pricePerCherryBox',
    };
    setUserModified(updatedUserModified);

    // Apply changes to cherryBox
    setCherryBox(updatedCherryBox);
  };

  const handleInputFocus = e => {
    const { name, value } = e.target;
    if (value === '') {
      setCherryBox({
        ...cherryBox,
        [name]: 0,
      });
    }
  };

  const handleInputBlur = e => {
    const { name } = e.target;
    setUserModified({
      discountRate: name === 'discountRate',
      pricePerCherryBox: name === 'pricePerCherryBox',
    });
  };

  useEffect(() => {
    if (
      userModified.pricePerCherryBox &&
      cherryBox.totalPriceBeforeDiscount &&
      cherryBox.quantity &&
      cherryBox.pricePerCherryBox
    ) {
      const discountPrice = cherryBox.pricePerCherryBox * cherryBox.quantity;
      const discountRate =
        ((cherryBox.totalPriceBeforeDiscount - discountPrice) /
          cherryBox.totalPriceBeforeDiscount) *
        100;

      setCherryBox(prevState => ({
        ...prevState,
        discountRate,
      }));
    }
  }, [
    cherryBox.totalPriceBeforeDiscount,
    cherryBox.quantity,
    cherryBox.pricePerCherryBox,
    userModified,
  ]);

  useEffect(() => {
    if (
      userModified.discountRate &&
      cherryBox.totalPriceBeforeDiscount &&
      cherryBox.quantity &&
      cherryBox.discountRate
    ) {
      const discountPrice =
        cherryBox.totalPriceBeforeDiscount * (1 - cherryBox.discountRate / 100);
      const pricePerBox = discountPrice / cherryBox.quantity;

      setCherryBox(prevState => ({
        ...prevState,
        pricePerCherryBox: pricePerBox,
      }));
    }
  }, [
    cherryBox.totalPriceBeforeDiscount,
    cherryBox.quantity,
    cherryBox.discountRate,
    userModified,
  ]);

  const handleRegisterBtnClick = () => {
    /*     console.log({
      memberId: memberAttributes.memberId,
      quantity: cherryBox.quantity,
      totalPriceBeforeDiscount: cherryBox.totalPriceBeforeDiscount,
      discountRate: cherryBox.discountRate,
      pricePerCherryBox: cherryBox.pricePerCherryBox,
    }); */
    putCherryBox({
      memberId: memberAttributes.memberId,
      quantity: cherryBox.quantity,
      totalPriceBeforeDiscount: cherryBox.totalPriceBeforeDiscount,
      discountRate: cherryBox.discountRate,
      pricePerCherryBox: cherryBox.pricePerCherryBox,
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
            value={cherryBox[cherryBoxData.data]}
            onChange={handleCherryBoxChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
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

import React, { useState, useEffect } from 'react';

import CherryInput from '@/components/CherryInput';
import InfoModal from '@/components/InfoModal';
import Modal from '@/components/Modal';
import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';
import { allFieldsFilled } from '@/utils/allFieldsFilled';
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
      data: 'priceAfterDiscount',
    },
  ];

  const [cherryBox, setCherryBox] = useState({
    totalPriceBeforeDiscount: 0,
    quantity: 0,
    discountRate: 0,
    priceAfterDiscount: 0,
  });

  const [userModified, setUserModified] = useState({
    discountRate: false,
    priceAfterDiscount: false,
  });

  const [warningModalOpen, setWargingModalOpen] = useState(false);

  const handleWarningModal = () => {
    setWargingModalOpen(!warningModalOpen);
  };

  const handleCherryBoxChange = e => {
    const { name, value } = e.target;

    // '할인율' 및 '체리박스 개당가격' 필드가 활성화되지 않았을 때 입력을 무시합니다.
    if (
      ['discountRate', 'priceAfterDiscount'].includes(name) &&
      (!cherryBox.totalPriceBeforeDiscount || !cherryBox.quantity)
    ) {
      return;
    }

    const updatedCherryBox = {
      ...cherryBox,
      [name]: value,
    };

    // Update userModified state
    const updatedUserModified = {
      discountRate: name === 'discountRate',
      priceAfterDiscount: name === 'priceAfterDiscount',
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
      priceAfterDiscount: name === 'priceAfterDiscount',
    });
  };

  const init = () => {
    setCherryBox({
      totalPriceBeforeDiscount: 0,
      quantity: 0,
      discountRate: 0,
      priceAfterDiscount: 0,
    });
    setUserModified({
      discountRate: false,
      priceAfterDiscount: false,
    });
  };

  const closeModal = () => {
    init();
    closeCherryBoxRegisterModal();
  };

  useEffect(() => {
    if (
      userModified.priceAfterDiscount &&
      cherryBox.totalPriceBeforeDiscount &&
      cherryBox.quantity &&
      cherryBox.priceAfterDiscount
    ) {
      const discountPrice = cherryBox.priceAfterDiscount * cherryBox.quantity;
      const discountRate =
        ((cherryBox.totalPriceBeforeDiscount - discountPrice) /
          cherryBox.totalPriceBeforeDiscount) *
        100;

      setCherryBox(prevState => ({
        ...prevState,
        discountRate: Math.floor(discountRate),
      }));
    }
  }, [
    cherryBox.totalPriceBeforeDiscount,
    cherryBox.quantity,
    cherryBox.priceAfterDiscount,
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
        priceAfterDiscount: Math.floor(pricePerBox),
      }));
    }
  }, [
    cherryBox.totalPriceBeforeDiscount,
    cherryBox.quantity,
    cherryBox.discountRate,
    userModified,
  ]);

  const handleRegisterBtnClick = () => {
    if (!allFieldsFilled(cherryBox)) {
      console.error('모든 필드를 채워주세요.');
      handleWarningModal();
      return;
    }
    putCherryBox(memberAttributes.storeId, {
      quantity: cherryBox.quantity,
      totalPriceBeforeDiscount: cherryBox.totalPriceBeforeDiscount,
      discountRate: cherryBox.discountRate,
      priceAfterDiscount: cherryBox.priceAfterDiscount,
    }).then(data => {
      if (data.code === 0) {
        openStore();
        closeModal();
      } else {
        console.error('오늘의 체리박스 등록에 실패했습니다.');
      }
    });
  };

  return (
    <Modal
      isOpen={cherryBoxRegisterModalOpen}
      onClose={closeModal}
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
      <InfoModal isOpen={warningModalOpen} onClose={handleWarningModal}>
        입력값을 <br />
        확인해주세요
      </InfoModal>
    </Modal>
  );
};

export default CherryBoxModal;

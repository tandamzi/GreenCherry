import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import { useSelector } from 'react-redux';

import empty from '@public/assets/lottie/empty-box.json';
import cn from 'classnames';
import { useRouter } from 'next/router';

import style from './index.module.scss'; // CSS를 이용해 애니메이션을 정의

import clientHttp from '@/utils/csr/clientHttp';

const NotificationList = ({ show }) => {
  const member = useSelector(state => state.member.memberInfo);

  const [notificationList, setNotificationList] = useState();

  const getNotificationList = async () => {
    try {
      const response = await clientHttp.get(`/notice/${member.id}`);

      setNotificationList(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (member.id) {
      getNotificationList();
    }
  }, []);

  const [toggleState, setToggleState] = useState(member.alarm);
  const changeToggle = () => {
    // todo : 알람 상태 변경 (redux + 백 보내기)
    setToggleState(prev => !prev);
  };

  const router = useRouter();
  const goToWriteReview = (memberId, storeId, orderId) => {
    router.push(`/review-form/${memberId}/${storeId}/${orderId}`);
  };

  const options = {
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // 애니메이션의 종횡비 유지
    },
  };
  return (
    <div
      className={cn(
        'w-full h-11/12 px-4 pt-4 pb-20 bg-bgcolor shadow-2xl rounded-t-3xl overflow-scroll scrollbar-hide',
        style['notification-list'],
        { [style.show]: show },
      )}
    >
      <div className="mb-28">
        <div
          className={cn(
            'fixed z-20 left-1/2 -translate-x-1/2 top-30 inline-block w-28 align-middle select-none transition duration-200 ease-in',
          )}
        >
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            className="toggle-checkbox hidden"
            checked={toggleState}
            readOnly
          />
          <label
            htmlFor="toggle"
            className="toggle-label block overflow-hidden h-9 rounded-full shadow-md cursor-pointer bg-bgcolor opacity-80"
          >
            <span
              className={`toggle-inner block w-14 h-9 bg-primaryevent rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                !toggleState ? 'translate-x-full' : 'translate-x-0 '
              }`}
            />
          </label>
          <div
            className="absolute inset-y-0 left-1.5 flex items-center pl-3 text-sm text-primaryfont font-bold cursor-pointer"
            onClick={changeToggle}
          >
            On
          </div>
          <div
            className="absolute inset-y-0 right-1.5 flex items-center pr-3 text-sm text-primaryfont font-bold cursor-pointer"
            onClick={changeToggle}
          >
            Off
          </div>
        </div>
      </div>
      {notificationList && notificationList.content.length > 0 ? (
        notificationList.content.map(item => {
          return (
            <div
              key={item.orderId}
              className={cn(
                'w-full flex px-4 py-6 mb-8 rounded-xl',
                style['notification-item'],
              )}
            >
              <div className="w-full ">
                <p>
                  <span className="font-bold">
                    {item.storeName}에서의 주문은 어떠셨나요?
                  </span>
                  <br />
                  <span className="text-sm">
                    {member.nickname}님의 소중한 리뷰를 남겨주세요
                  </span>
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="bg-primary py-1 px-2 rounded-xl"
                    onClick={() =>
                      goToWriteReview(member.id, item.storeId, item.orderId)
                    }
                  >
                    리뷰 작성하러가기
                  </button>
                </div>
              </div>

              <div />
            </div>
          );
        })
      ) : (
        <div className="flex flex-col justify-center items-center mb-5 h-full">
          <Lottie loop animationData={empty} play option={options} speed={1} />

          <span className="text-xl mt-6 pt-1"> 새로온 알림이 없어요</span>
        </div>
      )}
    </div>
  );
};

export default NotificationList;

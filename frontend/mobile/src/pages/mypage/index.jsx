import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Image from 'next/image';

import Container from '@/components/Container';
import MainFooterWithNavigation from '@/components/Container/components/MainFooterWithNavigation';
import IconButton from '@/components/IconButton';
import PrivateRouter from '@/components/PrivateRouter/PrivateRouter';
import { UserAvatar } from '@/components/UserAvatar';

const SUBSCRIBE_ICON_URL = `/assets/icons/buttonIcons/subscribeList.svg`;
const ORDER_ICON_URL = `/assets/icons/buttonIcons/orderList.svg`;
const REVIEW_ICON_URL = `/assets/icons/buttonIcons/reviewList.svg`;

const myPage = () => {
  const member = useSelector(state => state.member.memberInfo);
  useEffect(() => {
    // console.log(member);
  }, member);
  return (
    <Container>
      <Container.Header />
      <Container.MainBody>
        <div className="flex flex-col justify-center items-center mb-3">
          <UserAvatar
            width={120}
            height={120}
            imageURL={member.image}
            changable
          />
          <span className="mt-3 text-xl">{member.nickname}</span>
        </div>

        <div className="grid grid-cols-3 justify-items-center -mx-4  border-line border-b border-t">
          <IconButton
            name="subscibe"
            iconUrl={SUBSCRIBE_ICON_URL}
            width={64}
            height={64}
            className="border-line border-r px-8 py-4"
            label="구독내역"
          />
          <IconButton
            name="order"
            iconUrl={ORDER_ICON_URL}
            width={64}
            height={64}
            label="주문내역"
          />
          <IconButton
            name="review"
            iconUrl={REVIEW_ICON_URL}
            width={64}
            height={64}
            className="border-line border-l px-8 py-4"
            label="리뷰내역"
          />
        </div>
      </Container.MainBody>
      <div className="sticky w-full z-20 bottom-7 flex justify-center">
        <Container.MainFooterWithNavigation position="sticky" />
      </div>
    </Container>
  );
};
export default PrivateRouter(myPage);

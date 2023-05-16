import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import { Router, useRouter } from 'next/router';

import Container from '@/components/Container';
import MainFooterWithNavigation from '@/components/Container/components/MainFooterWithNavigation';
import IconButton from '@/components/IconButton';
import PrivateRouter from '@/components/PrivateRouter/PrivateRouter';
import { UserAvatar } from '@/components/UserAvatar';
import { changePage } from '@/redux/footerStatus/footerReducer';

const SUBSCRIBE_ICON_URL = `/assets/icons/buttonIcons/subscribeList.svg`;
const ORDER_ICON_URL = `/assets/icons/buttonIcons/orderList.svg`;
const REVIEW_ICON_URL = `/assets/icons/buttonIcons/reviewList.svg`;

const TREE_1_ICON_URL = `/assets/icons/treesIcons/tree1.svg`;
const TREE_2_ICON_URL = `/assets/icons/treesIcons/tree2.svg`;
const TREE_3_ICON_URL = `/assets/icons/treesIcons/tree3.svg`;
const TREE_4_ICON_URL = `/assets/icons/treesIcons/tree4.svg`;
const TREE_5_ICON_URL = `/assets/icons/treesIcons/tree5.svg`;
const TREE_6_ICON_URL = `/assets/icons/treesIcons/tree6.svg`;

const myPage = () => {
  const member = useSelector(state => state.member.memberInfo);
  useEffect(() => {
    // console.log(member);
  }, member);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePage('주변 가게'));
  });

  const getTreeUrl = cherryPoint => {
    switch (cherryPoint) {
      case cherryPoint > 0 && cherryPoint <= 10:
        return TREE_1_ICON_URL;
      case cherryPoint > 10 && cherryPoint <= 20:
        return TREE_2_ICON_URL;
      case cherryPoint > 20 && cherryPoint <= 30:
        return TREE_3_ICON_URL;
      case cherryPoint > 30 && cherryPoint <= 40:
        return TREE_4_ICON_URL;
      case cherryPoint > 40 && cherryPoint <= 50:
        return TREE_5_ICON_URL;
      default:
        return '';
    }
  };
  const router = useRouter();
  const goToPage = page => {
    router.push(`/${page}`);
  };

  return (
    <Container>
      <Container.SubPageHeader />
      <Container.MainBody>
        <div className="flex flex-col justify-center items-center mb-3">
          <UserAvatar
            width={150}
            height={150}
            imageURL={member.image}
            changable
          />
          <span className="my-3 text-xl">{member.nickname}</span>
        </div>

        <div className="grid grid-cols-3 col-auto justify-items-center -mx-4 border-line border-b border-t">
          <IconButton
            name="subscibe"
            iconUrl={SUBSCRIBE_ICON_URL}
            width={68}
            height={68}
            className="border-line border-r px-8 py-4"
            label="구독내역"
            onClick={() => goToPage('subscribe')}
          />
          <IconButton
            name="order"
            iconUrl={ORDER_ICON_URL}
            width={68}
            height={68}
            label="주문내역"
            onClick={() => goToPage('order-list')}
          />
          <IconButton
            name="review"
            iconUrl={REVIEW_ICON_URL}
            width={68}
            height={68}
            className="border-line border-l px-8 py-4"
            label="리뷰내역"
            onClick={() => goToPage('review-list')}
          />
        </div>

        <div className="flex flex-col items-center mt-10 text-xl">
          <p>지금까지</p>
          <p>얼마나</p>
          <p>환경을 아꼈을까요?</p>
        </div>

        <div className="rounded-full">
          <Image />
        </div>
      </Container.MainBody>
      <div className="sticky w-full z-20 bottom-7 flex justify-center">
        <Container.MainFooterWithNavigation position="fixed" />
      </div>
    </Container>
  );
};
export default PrivateRouter(myPage);

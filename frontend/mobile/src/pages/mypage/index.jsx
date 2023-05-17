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

const tree1 = {
  tree: `/assets/icons/treesIcons/tree1.svg`,
  emoji: `/assets/icons/emojiIcons/emoji1.svg`,
};
const tree2 = {
  tree: `/assets/icons/treesIcons/tree2.svg`,
  emoji: `/assets/icons/emojiIcons/emoji2.svg`,
};
const tree3 = {
  tree: `/assets/icons/treesIcons/tree3.svg`,
  emoji: `/assets/icons/emojiIcons/emoji3.svg`,
};
const tree4 = {
  tree: `/assets/icons/treesIcons/tree4.svg`,
  emoji: `/assets/icons/emojiIcons/emoji4.svg`,
};
const tree5 = {
  tree: `/assets/icons/treesIcons/tree5.svg`,
  emoji: `/assets/icons/emojiIcons/emoji5.svg`,
};
const tree6 = {
  tree: `/assets/icons/treesIcons/tree6.svg`,
  emoji: `/assets/icons/emojiIcons/emoji6.svg`,
};

const myPage = () => {
  const member = useSelector(state => state.member.memberInfo);
  useEffect(() => {}, member);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePage('주변 가게'));
  });

  const getTreeUrl = cherryPoint => {
    if (cherryPoint >= 0 && cherryPoint <= 8) {
      return tree1;
    }
    if (cherryPoint > 8 && cherryPoint <= 16) {
      return tree2;
    }
    if (cherryPoint > 16 && cherryPoint <= 24) {
      return tree3;
    }
    if (cherryPoint > 24 && cherryPoint <= 32) {
      return tree4;
    }
    if (cherryPoint > 32 && cherryPoint <= 40) {
      return tree5;
    }
    if (cherryPoint > 40) {
      return tree6;
    }
    return '';
  };

  const router = useRouter();
  const goToPage = page => {
    router.push(`/${page}`);
  };

  return (
    <Container className="overflow-scroll scrollbar-hide">
      <Container.SubPageHeader goHome />
      <Container.MainBody>
        <div className="flex flex-col justify-center items-center mb-3">
          <UserAvatar
            width={150}
            height={150}
            imageURL={member.image}
            changable
          />
          <span className="mt-3 text-xl">{member.nickname}</span>
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

        <div className="flex flex-col items-center mt-6 text-primaryfont text-xl">
          <p className="text-center">
            지금까지
            <br />
            <span className="font-bold text-2xl text-secondary">
              {member.cherryPoint}Kg CO<sub>2</sub>
            </span>
            만큼
          </p>
          <span className="text-xl mt-1 text-primaryfont">
            탄소를 줄였어요{' '}
          </span>
          <div className="rounded-full flex justify-center items-center w-44 h-44 mt-2 shadow-lg bg-itembg">
            <div className="relative" style={{ width: 88, height: 96 }}>
              <Image src={getTreeUrl(member.cherryPoint).tree} fill />
            </div>
          </div>

          <div className="flex justify-center items-center mt-4 text-sm">
            나무 1그루를 심으셨어요
            <div className="relative ml-0.5" style={{ width: 20, height: 20 }}>
              <Image src={getTreeUrl(member.cherryPoint).emoji} fill />
            </div>
          </div>
        </div>
      </Container.MainBody>
      <div className="mb-4 border-line border-b" />

      <div className="pb-4 text-center text-secondaryfont">
        하루 평균 <br />
        <span className="font-bold text-primaryfont">3000톤</span>의 음식이
        버려지고 있습니다
      </div>
      {/* <div className="sticky w-full z-20 bottom-7 flex justify-center">
        <Container.MainFooterWithNavigation position="fixed" />
      </div> */}
    </Container>
  );
};
export default PrivateRouter(myPage);

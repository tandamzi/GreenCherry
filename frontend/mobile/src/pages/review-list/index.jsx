/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import MyReview from '@/components/MyReview';
import clientHttp from '@/utils/csr/clientHttp';

const reviewList = () => {
  const router = useRouter();
  const [reviewListInfo, setReviewListInfo] = useState([]);

  const memberId = useSelector(state => state.member.memberInfo.id);
  const nickname = useSelector(state => state.member.memberInfo.nickname);
  const image = useSelector(state => state.member.memberInfo.image);
  const getReviewList = async () => {
    try {
      const response = await clientHttp.get(`/myreview/${memberId}`);
      setReviewListInfo(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getReviewList();
  }, []);

  return (
    <Container className="overflow-scroll scrollbar-hide overflow-x-hidden">
      <Container.SubPageHeader title="리뷰 관리" goHome sticky={false} />
      <Container.MainBody>
        <MyReview
          reviewInfo={reviewListInfo}
          nickname={nickname}
          image={image}
        />

        <div className="pb-4 text-center text-secondaryfont">
          매년 먹을 수 있는 음식 <br />
          <span className="font-bold text-primaryfont">855톤</span>이 버려지고
          있습니다.
        </div>
      </Container.MainBody>
    </Container>
  );
};
export default reviewList;

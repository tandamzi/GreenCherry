/* eslint-disable react/button-has-type */
import React from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import PrivateRouter from '@/components/PrivateRouter/PrivateRouter';
import ReservationStatus from '@/components/store/ReservationStatus';
import StoreInfo from '@/components/store/StoreInfo';
import StoreTag from '@/components/store/StoreTag';
import UserReview from '@/components/store/UserReview';
import createBFFInstance from '@/utils/ssr/bffHttp';

const store = ({ storeProps }) => {
  const router = useRouter();
  return (
    <Container className="overflow-scroll">
      <Container.SubPageHeader sticky={false} />
      <div className="pb-12">
        <StoreInfo storeInfo={storeProps.storeInfo} />
        <ReservationStatus reservationInfo={storeProps.storeInfo} />
        <StoreTag />
        <UserReview reviewInfo={storeProps.review} />
      </div>

      <div className="pb-4 text-center text-secondaryfont">
        연간 먹을 수 있는 음식 <br />
        <span className="font-bold text-primaryfont">855톤</span>이 버려지고
        있습니다.
      </div>
    </Container>
  );
};
export default PrivateRouter(store);

export const getServerSideProps = async context => {
  const { id } = context.query;
  const { req } = context;
  const httpInstance = createBFFInstance(req);

  const response = await httpInstance.get(`/api/store/${id}`);
  return {
    props: {
      storeProps: response.data,
    },
  };
};

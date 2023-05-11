/* eslint-disable react/button-has-type */
import React from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import ReservationStatus from '@/components/store/ReservationStatus';
import StoreInfo from '@/components/store/StoreInfo';
import StoreTag from '@/components/store/StoreTag';
import UserReview from '@/components/store/UserReview';
import createHttpInstance from '@/utils/ssr/backendhttp';
import createBFFInstance from '@/utils/ssr/bffHttp';

const store = ({ storeProps }) => {
  const router = useRouter();
  return (
    <Container>
      <div>
        <StoreInfo storeInfo={storeProps.storeInfo} />
        <ReservationStatus reservationInfo={storeProps.storeInfo} />
        <StoreTag />
        <UserReview reviewInfo={storeProps.review} />
      </div>
    </Container>
  );
};

export default store;

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

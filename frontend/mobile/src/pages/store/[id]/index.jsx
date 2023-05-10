/* eslint-disable react/button-has-type */
import React from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import ReservationStatus from '@/components/store/ReservationStatus';
import StoreInfo from '@/components/store/StoreInfo';
import StoreTag from '@/components/store/StoreTag';
import UserReview from '@/components/store/UserReview';
import http, { localHttp } from '@/server/api/http';

const store = ({ storeProps }) => {
  const router = useRouter();
  return (
    <Container>
      <div>
        <StoreInfo storeInfo={storeProps.storeInfo} />
        <ReservationStatus reservationInfo={storeProps.storeInfo} />
        <StoreTag />
        <UserReview />
      </div>
    </Container>
  );
};

export default store;

export const getServerSideProps = async context => {
  const { id } = context.query;
  const headers = {
    headers: {
      Authorization: context.req.cookies.accessToken,
    },
  };
  const response = await localHttp.get(`/api/store/${id}`, headers);

  return {
    props: {
      storeProps: response.data,
    },
  };
};

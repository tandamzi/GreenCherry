/* eslint-disable react/button-has-type */
import React from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import ReservationStatus from '@/components/store/ReservationStatus';
import StoreInfo from '@/components/store/StoreInfo';
import StoreTag from '@/components/store/StoreTag';
import UserReview from '@/components/store/UserReview';

const store = ({ storeProps }) => {
  const router = useRouter();
  return (
    <Container>
      <div className="grid grid-rows-5">
        <StoreInfo storeInfo={storeProps.storeInfo} className="row-span-2" />
        <ReservationStatus />
        <StoreTag />
        <UserReview />
      </div>
    </Container>
  );
};

export default store;

export const getServerSideProps = async context => {
  const { id } = context.query;
  const response = await axios.get(`http://127.0.0.1:3000/api/store/${id}`);

  return {
    props: {
      storeProps: response.data,
    },
  };
};

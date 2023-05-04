/* eslint-disable react/button-has-type */
import React from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import ReservationStatus from '@/components/store/ReservationStatus';
import StoreInfo from '@/components/store/StoreInfo';
import StoreReview from '@/components/store/StoreReview';
import UserReview from '@/components/store/UserReview';

const store = ({ storeProps }) => {
  const router = useRouter();
  return (
    <Container>
      <div className="grid grid-rows-5">
        <StoreInfo />
        <ReservationStatus />
        <StoreReview />
        <UserReview />
      </div>
    </Container>
  );
};

export default store;

export const getServerSideProps = async context => {
  const { id } = context.query;
  const response = await axios.get(`http://localhost:3000/api/store/${id}`);

  return {
    props: {
      storeProps: response.data,
    },
  };
};

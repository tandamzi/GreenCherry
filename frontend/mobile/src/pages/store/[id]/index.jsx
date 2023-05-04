/* eslint-disable react/button-has-type */
import React from 'react';

import { useRouter } from 'next/router';

import Container from '@/components/Container';
import ReservationStatus from '@/components/store/ReservationStatus';
import StoreInfo from '@/components/store/StoreInfo';
import StoreReview from '@/components/store/StoreReview';
import UserReview from '@/components/store/UserReview';

const store = () => {
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

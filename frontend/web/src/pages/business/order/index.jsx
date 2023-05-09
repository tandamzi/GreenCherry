import React from 'react';

import CarbonContainer from '@/components/CarbonContainer';
import Container from '@/components/Container';
import TotalIncome from '@/components/TotalIncome';

const Order = () => {
  const totalIncome = 100000;
  const totalCarbon = 1000;
  return (
    <Container>
      <Container.BusinessHeader />
      <Container.MainBody className="bg-bgcolor h-full">
        <div className="w-full max-w-4xl">
          <CarbonContainer amount={totalCarbon} />
          <TotalIncome price={totalIncome} />
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Order;

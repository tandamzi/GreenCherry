import React from 'react';

import { Container } from 'postcss';

import MainFooterWithNavigation from '@/components/Container/components/MainFooterWithNavigation';
import SubPageHeader from '@/components/Container/components/SubPageHeader';

const test = () => {
  return (
    <Container>
      <SubPageHeader />
      <MainFooterWithNavigation />
    </Container>
  );
};

export default test;

import React from 'react';

import Container from '@/components/Container';
import MainFooterWithNavigation from '@/components/Container/components/MainFooterWithNavigation';
import SubPageHeader from '@/components/Container/components/SubPageHeader';

const test = () => {
  return (
    <Container>
      <Container.SubPageHeader title="test" goHome="true" />

      <MainFooterWithNavigation />
    </Container>
  );
};

export default test;

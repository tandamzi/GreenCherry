import React from 'react';

import Container from '@/components/Container';
import { UserAvatar } from '@/components/UserAvatar';

const myPage = () => {
  return (
    <Container>
      <Container.SubPageHeader goHome title="마이페이지" />
      <Container.MainBody>
        <UserAvatar />
      </Container.MainBody>
    </Container>
  );
};

export default myPage;

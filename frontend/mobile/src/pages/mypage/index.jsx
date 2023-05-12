import React from 'react';

import Container from '@/components/Container';
import PrivateRouter from '@/components/PrivateRouter/PrivateRouter';
import { UserAvatar } from '@/components/UserAvatar';

const myPage = () => {
  return (
    <Container>
      <Container.SubPageHeader goHome title="마이페이지" />
      <Container.MainBody>
        {/* <UserAvatar width={100} height={100} changable={true} /> */}
      </Container.MainBody>
    </Container>
  );
};
export default PrivateRouter(myPage);

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Container from '@/components/Container';
import MainFooterWithNavigation from '@/components/Container/components/MainFooterWithNavigation';
import PrivateRouter from '@/components/PrivateRouter/PrivateRouter';
import { UserAvatar } from '@/components/UserAvatar';

const myPage = () => {
  const member = useSelector(state => state.member.memberInfo);
  useEffect(() => {}, member);
  return (
    <Container>
      <Container.Header />
      <Container.MainBody>
        <div className="header">
          <div className="flex justify-center">
            <UserAvatar
              width={120}
              height={120}
              imageURL={member.image}
              changable
            />
          </div>
          <div />
        </div>
      </Container.MainBody>
      <div className="sticky w-full z-20 bottom-7 flex justify-center">
        <Container.MainFooterWithNavigation position="sticky" />
      </div>
    </Container>
  );
};
export default PrivateRouter(myPage);

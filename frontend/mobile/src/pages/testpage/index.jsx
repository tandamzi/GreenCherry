import React from 'react';
import { useDispatch } from 'react-redux';

import Container from '@/components/Container';
import MainFooterWithNavigation from '@/components/Container/components/MainFooterWithNavigation';
import SubPageHeader from '@/components/Container/components/SubPageHeader';
import PrivateRouter from '@/components/PrivateRouter/PrivateRouter';
import { reset as reset1 } from '@/redux/member/memberReducer';
import { reset as reset2 } from '@/redux/storeList/storeListReducer';

const test = () => {
  const dispatch = useDispatch();

  const reset = () => {
    dispatch(reset1());
    dispatch(reset2());
  };
  return (
    <Container>
      <Container.SubPageHeader title="test" goHome="true" />
      <Container.MainBody>
        <button
          type="button"
          onClick={() => {
            reset();
          }}
        >
          reset button
        </button>
      </Container.MainBody>
      <MainFooterWithNavigation position="fixed" />
    </Container>
  );
};

export default PrivateRouter(test);

import React from 'react';

import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const goToPage = () => {
    router.replace('/home');
  };
  return (
    <div>
      소 개 페 이 지
      <button type="button" className="bg-primary" onClick={goToPage}>
        홈으로가기
      </button>
    </div>
  );
};

export default index;

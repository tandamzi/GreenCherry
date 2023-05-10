import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import { reset } from '@/redux/member/memberReducer';

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const PrivateRouter = WrappedComponent => {
  const Auth = props => {
    const member = useSelector(state => state.member);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      if (member?.accessToken) {
        // 토큰 검증
        const { exp } = jwtDecode(member.accessToken);
        const expireDate = new Date(exp * 1000);
        if (expireDate <= new Date()) {
          Toast.fire({
            icon: 'warning',
            title: '인증기간이 만료되었습니다. 다시 로그인을 해주세요.',
          });
          dispatch(reset());
          router.replace('/login');
        }
      } else {
        // 토근이 없다면 로그인 화면
        Toast.fire({
          icon: 'warning',
          title: '로그인 후 이용가능합니다.',
        });

        dispatch(reset());
        router.replace('/login');
      }
    }, [member]);

    return <WrappedComponent {...props} />;
  };
  return Auth;
};
export default PrivateRouter;

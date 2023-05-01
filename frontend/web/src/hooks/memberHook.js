import { useDispatch, useSelector } from 'react-redux';

import { loginAction, logoutAction } from '@/redux/member/memberSlice';

export default function useMember() {
  const { storeId, storeName, memberId } = useSelector(state => state.member);
  const dispatch = useDispatch();

  const login = data => {
    dispatch(loginAction(data));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return { storeId, storeName, memberId, login, logout };
}

import { useDispatch, useSelector } from 'react-redux';

import {
  setMemberIdAction,
  loginAction,
  logoutAction,
} from '@/redux/member/memberSlice';
import { closeCloseStoreModalAction } from '@/redux/modal/modalSlice';
import { loginStoreAction, logoutStoreAction } from '@/redux/store/storeSlice';

export default function useMember() {
  const { storeId, storeName, memberId } = useSelector(state => state.member);
  const dispatch = useDispatch();

  const setMemberId = data => {
    dispatch(setMemberIdAction(data));
  };

  const login = data => {
    dispatch(loginAction(data));
    dispatch(loginStoreAction(data));
  };

  const logout = () => {
    dispatch(logoutAction());
    dispatch(logoutStoreAction());
  };

  return {
    memberAttributes: {
      storeId,
      storeName,
      memberId,
    },
    setMemberId,
    login,
    logout,
  };
}

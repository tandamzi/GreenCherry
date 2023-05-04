import { useDispatch, useSelector } from 'react-redux';

import {
  loginAction,
  logoutAction,
  openMyStoreModalAction,
  closeMyStoreModalAction,
} from '@/redux/member/memberSlice';

export default function useMember() {
  const { storeId, storeName, memberId, myStoreModalOpen } = useSelector(
    state => state.member,
  );
  const dispatch = useDispatch();

  const login = data => {
    dispatch(loginAction(data));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const openMyStoreModal = () => {
    dispatch(openMyStoreModalAction());
  };

  const closeMyStoreModal = () => {
    dispatch(closeMyStoreModalAction());
  };

  return {
    memberAttributes: {
      storeId,
      storeName,
      memberId,
    },
    login,
    logout,
    myStoreModalOpen,
    openMyStoreModal,
    closeMyStoreModal,
  };
}

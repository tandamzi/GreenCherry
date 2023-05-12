import { useDispatch, useSelector } from 'react-redux';

import {
  setMemberIdAction,
  loginAction,
  logoutAction,
  openMyStoreModalAction,
  closeMyStoreModalAction,
  openCherryBoxRegisterAction,
  closeCherryBoxRegisterAction,
} from '@/redux/member/memberSlice';

export default function useMember() {
  const {
    storeId,
    storeName,
    memberId,
    myStoreModalOpen,
    cherryBoxRegisterModalOpen,
  } = useSelector(state => state.member);
  const dispatch = useDispatch();

  const setMemberId = data => {
    dispatch(setMemberIdAction(data));
  };

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

  const openCherryBoxRegisterModal = () => {
    dispatch(openCherryBoxRegisterAction());
  };

  const closeCherryBoxRegisterModal = () => {
    dispatch(closeCherryBoxRegisterAction());
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
    myStoreModalOpen,
    openMyStoreModal,
    closeMyStoreModal,
    cherryBoxRegisterModalOpen,
    openCherryBoxRegisterModal,
    closeCherryBoxRegisterModal,
  };
}

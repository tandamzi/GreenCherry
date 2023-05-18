import { useDispatch, useSelector } from 'react-redux';

import {
  openCloseStoreModalAction,
  closeCloseStoreModalAction,
  openMyStoreModalAction,
  closeMyStoreModalAction,
  openCherryBoxRegisterAction,
  closeCherryBoxRegisterAction,
} from '@/redux/modal/modalSlice';

export default function useModal() {
  const { closeStoreModalOpen, myStoreModalOpen, cherryBoxRegisterModalOpen } =
    useSelector(state => state.modal);

  const dispatch = useDispatch();

  const openCloseStoreModal = () => {
    dispatch(openCloseStoreModalAction());
  };

  const closeCloseStoreModal = () => {
    dispatch(closeCloseStoreModalAction());
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
    closeStoreModalOpen,
    myStoreModalOpen,
    cherryBoxRegisterModalOpen,
    openCloseStoreModal,
    closeCloseStoreModal,
    openMyStoreModal,
    closeMyStoreModal,
    openCherryBoxRegisterModal,
    closeCherryBoxRegisterModal,
  };
}

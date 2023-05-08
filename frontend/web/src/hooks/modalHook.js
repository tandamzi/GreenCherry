import { useDispatch, useSelector } from 'react-redux';

import {
  openCloseStoreModalAction,
  closeCloseStoreModalAction,
} from '@/redux/modal/modalSlice';

export default function useModal() {
  const { closeStoreModalOpen } = useSelector(state => state.modal);

  const dispatch = useDispatch();

  const openCloseStoreModal = () => {
    dispatch(openCloseStoreModalAction());
  };

  const closeCloseStoreModal = () => {
    dispatch(closeCloseStoreModalAction());
  };

  return {
    closeStoreModalOpen,
    openCloseStoreModal,
    closeCloseStoreModal,
  };
}

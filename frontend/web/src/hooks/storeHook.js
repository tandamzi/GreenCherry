import { useDispatch, useSelector } from 'react-redux';

import { modifyAction, resetModifyAction } from '@/redux/store/modifySlice';
import {
  setModifiableAction,
  setCherryPointAction,
  getStoreInfoAction,
  putStoreInfoAction,
  openStoreAction,
  closeStoreAction,
} from '@/redux/store/storeSlice';

export default function useStore() {
  const {
    storeId,
    open,
    pickUpStartTime,
    pickUpEndTime,
    cherryPoint,
    instagram,
    storeDescription,
    cherryBoxDescription,
    allergies,
    images,
  } = useSelector(state => state.business);

  const { modifyState, modifyType } = useSelector(state => state.modify);

  const dispatch = useDispatch();

  const setModifiable = data => {
    dispatch(setModifiableAction(data));
  };

  const setCherryPoint = data => {
    // console.log('setCherryPointAction: ', data);
    dispatch(setCherryPointAction(data));
  };

  const getStoreInfo = data => {
    dispatch(getStoreInfoAction(data));
  };

  const putStoreInfo = data => {
    dispatch(putStoreInfoAction(data));
  };

  const putModifyState = data => {
    dispatch(modifyAction(data));
  };

  const resetModifyState = () => {
    dispatch(resetModifyAction());
  };

  const openStore = () => {
    dispatch(openStoreAction());
  };

  const closeStore = () => {
    dispatch(closeStoreAction());
  };

  return {
    storeAttributes: {
      storeId,
      open,
      pickUpStartTime,
      pickUpEndTime,
      cherryPoint,
      instagram,
      storeDescription,
      cherryBoxDescription,
      allergies,
      images,
    },
    setModifiable,
    setCherryPoint,
    getStoreInfo,
    putStoreInfo,
    modifyState,
    modifyType,
    putModifyState,
    resetModifyState,
    openStore,
    closeStore,
  };
}

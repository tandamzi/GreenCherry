import { useDispatch, useSelector } from 'react-redux';

import { modifyAction, resetModifyAction } from '@/redux/store/modifySlice';
import {
  getStoreInfoAction,
  putStoreInfoAction,
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
    cherryboxDescription,
    allergies,
    images,
  } = useSelector(state => state.business);

  const { modifyState, modifyType } = useSelector(state => state.modify);

  const dispatch = useDispatch();

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

  return {
    storeAttributes: {
      storeId,
      open,
      pickUpStartTime,
      pickUpEndTime,
      cherryPoint,
      instagram,
      storeDescription,
      cherryboxDescription,
      allergies,
      images,
    },
    getStoreInfo,
    putStoreInfo,
    modifyState,
    modifyType,
    putModifyState,
    resetModifyState,
  };
}

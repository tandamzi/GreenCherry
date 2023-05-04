import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeId: '',
  storeName: '',
  memberId: '',
  myStoreModalOpen: false,
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      return {
        ...state,
        storeId: action.payload.storeId,
        storeName: action.payload.storeName,
        memberId: action.payload.memberId,
      };
    },
    logoutAction: state => {
      return {
        ...state,
        storeId: '',
        storeName: '',
        memberId: '',
      };
    },
    openMyStoreModalAction: state => {
      return {
        ...state,
        myStoreModalOpen: true,
      };
    },
    closeMyStoreModalAction: state => {
      return {
        ...state,
        myStoreModalOpen: false,
      };
    },
  },
});

const { reducer, actions } = memberSlice;
export const {
  loginAction,
  logoutAction,
  openMyStoreModalAction,
  closeMyStoreModalAction,
} = actions;
export default reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeId: '',
  storeName: '',
  memberId: '',
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
  },
});

const { reducer, actions } = memberSlice;
export const { loginAction, logoutAction } = actions;
export default reducer;

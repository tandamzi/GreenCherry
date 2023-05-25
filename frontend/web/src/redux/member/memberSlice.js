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
    setMemberIdAction: (state, action) => {
      return {
        ...state,
        memberId: action.payload.memberId,
      };
    },
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
export const { setMemberIdAction, loginAction, logoutAction } = actions;
export default reducer;

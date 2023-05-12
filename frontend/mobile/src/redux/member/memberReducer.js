import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { PURGE } from 'redux-persist';

const initialState = {
  memberInfo: {},
  token: '',
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      localStorage.setItem('token', `Bearer ${action.payload}`);
      // console.log('saveToken' + action.payload);
      return {
        ...state,
        token: action.payload,
      };
    },
    saveInfo: (state, action) => {
      return {
        ...state,
        memberInfo: action.payload.data,
      };
    },
    reset(state) {
      localStorage.removeItem('token');
      Cookies.remove('token');

      // eslint-disable-next-line no-param-reassign
      state = {
        ...state,
        memberInfo: {},
        token: '',
      };
    },
  },
});
export const { saveToken, saveInfo, reset } = memberSlice.actions;
export default memberSlice.reducer;

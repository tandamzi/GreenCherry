import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

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
      // 토큰 저장 시

      return {
        ...state,
        token: action.payload,
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
export const { saveToken, reset } = memberSlice.actions;
export default memberSlice.reducer;

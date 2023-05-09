import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  memberInfo: {},
  accessToken: '',
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      localStorage.setItem('accessToken', `Bearer ${action.payload}`);
      Cookies.set('accessToken', `Bearer ${action.payload}`);

      return {
        ...state,
        accessToken: action.payload,
      };
    },
    reset(state) {
      localStorage.removeItem('accessToken');
      Cookies.remove('accessToken');

      // eslint-disable-next-line no-param-reassign
      state = {
        ...state,
        memberInfo: {},
        accessToken: '',
      };
    },
  },
});
export const { saveToken, reset } = memberSlice.actions;
export default memberSlice.reducer;

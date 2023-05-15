import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  memberInfo: {
    id: '',
    email: '',
    nickname: '',
    cherryPoint: '',
    image: '',
    alarm: '',
  },
  token: '',
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      localStorage.setItem('token', `Bearer ${action.payload}`);
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
    changeProfile: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.memberInfo.image = action.payload;
    },
    reset: state => {
      localStorage.removeItem('token');
      localStorage.removeItem('member');
      Cookies.remove('token');

      // eslint-disable-next-line no-param-reassign
      state.memberInfo = {};
      // eslint-disable-next-line no-param-reassign
      state.token = '';
    },
  },
});
export const { saveToken, saveInfo, changeProfile, reset } =
  memberSlice.actions;
export default memberSlice.reducer;

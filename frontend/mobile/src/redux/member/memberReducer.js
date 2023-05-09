import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

import http from '@/server/api/http';

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

      return {
        ...state,
        accessToken: action.payload,
      };
    },
    reset(state) {
      localStorage.removeItem('accessToken');

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

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { PURGE } from 'redux-persist';

import http from '@/utils/http';

export const loginAsync = createAsyncThunk(
  'member/loginAsync',
  async (token, { rejectWithValue }) => {
    // console.log('loging ASYNC');
    try {
      const response = await http.get('/member', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response);
      return { memberInfo: response.data, token };
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

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
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        return { ...state, status: 'Loading' };
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        // console.log(action.payload);
        const { memberInfo } = action.payload;
        return {
          ...state,
          memberInfo,
          status: 'Success',
        };
      })
      .addCase(loginAsync.rejected, state => {
        return { ...state, token: null, status: 'Fail' };
      })
      .addCase(PURGE, () => initialState);
  },
});
export const { saveToken, reset } = memberSlice.actions;
export default memberSlice.reducer;

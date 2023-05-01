import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

import http from '@/server/api/http';

export const loginAsync = createAsyncThunk(
  'member/loginAsync',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await http.post('', {
        email,
        password,
      });

      localStorage.setItem('accessToken', `Bearer ${data.data.accessToken}`);
      return [
        { memberInfo: data.data.memberInfo },
        { accessToken: `Bearer ${data.data.accessToken}` },
      ];
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);
const initialState = {
  memberInfo: {},
  accessToken: '',
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    addExtraId: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.memberInfo = {
        github: action.payload[0],
        baekjoon: action.payload[1],
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
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        return { ...state, status: 'Loading' };
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const [memberInfo, accessToken] = action.payload;
        return {
          ...state,
          memberInfo: memberInfo.memberInfo,
          accessToken: accessToken.accessToken,
          status: 'Success',
        };
      })
      .addCase(loginAsync.rejected, state => {
        return { ...state, token: null, status: 'Fail' };
      })
      .addCase(PURGE, () => initialState);
  },
});
export const { reset, addGithubId, addSolvedAcId, addExtraId } =
  memberSlice.actions;
export default memberSlice.reducer;

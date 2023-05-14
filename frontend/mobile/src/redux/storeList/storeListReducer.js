import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeList: [],
};

export const storeListSlice = createSlice({
  name: 'storeList',
  initialState,
  reducers: {
    saveStoreList: (state, action) => {
      return {
        ...state,
        storeList: action.payload,
      };
    },
    reset: state => {
      // eslint-disable-next-line no-param-reassign
      state.storeList = [];
    },
  },
});
export const { saveStoreList, reset } = storeListSlice.actions;
export default storeListSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: '홈',
};

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {
    changePage: (state, action) => {
      return { ...state, currentPage: action.payload };
    },
  },
});

export const { changePage } = footerSlice.actions;
export default footerSlice.reducer;

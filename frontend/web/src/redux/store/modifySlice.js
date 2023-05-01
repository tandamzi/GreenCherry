import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modifyState: false,
  modifyType: '',
};

export const modifySlice = createSlice({
  name: 'modify',
  initialState,
  reducers: {
    modifyAction: (state, action) => {
      return {
        ...state,
        modifyState: true,
        modifyType: action.payload,
      };
    },
    resetModifyAction: state => {
      return {
        ...state,
        modifyState: false,
        modifyType: '',
      };
    },
  },
});

const { reducer, actions } = modifySlice;
export const { modifyAction, resetModifyAction } = actions;
export default reducer;

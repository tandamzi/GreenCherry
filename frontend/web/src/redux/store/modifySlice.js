import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  state: false,
  type: '',
};

export const modifySlice = createSlice({
  name: 'modify',
  initialState,
  reducers: {
    modifyAction: (state, action) => {
      return {
        ...state,
        state: true,
        type: action.payload,
      };
    },
    resetModifyAction: state => {
      return {
        ...state,
        state: false,
        type: '',
      };
    },
  },
});

const { reducer, actions } = modifySlice;
export const { modifyAction, resetModifyAction } = actions;
export default reducer;

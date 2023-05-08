import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  closeStoreModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCloseStoreModalAction: state => {
      return {
        ...state,
        closeStoreModalOpen: true,
      };
    },
    closeCloseStoreModalAction: state => {
      return {
        ...state,
        closeStoreModalOpen: false,
      };
    },
  },
});

const { reducer, actions } = modalSlice;
export const { openCloseStoreModalAction, closeCloseStoreModalAction } =
  actions;
export default reducer;

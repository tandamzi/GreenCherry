import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  closeStoreModalOpen: false,
  myStoreModalOpen: false,
  cherryBoxRegisterModalOpen: false,
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
    openMyStoreModalAction: state => {
      return {
        ...state,
        myStoreModalOpen: true,
      };
    },
    closeMyStoreModalAction: state => {
      return {
        ...state,
        myStoreModalOpen: false,
      };
    },
    openCherryBoxRegisterAction: state => {
      return {
        ...state,
        cherryBoxRegisterModalOpen: true,
      };
    },
    closeCherryBoxRegisterAction: state => {
      return {
        ...state,
        cherryBoxRegisterModalOpen: false,
      };
    },
  },
});

const { reducer, actions } = modalSlice;
export const {
  openCloseStoreModalAction,
  closeCloseStoreModalAction,
  openMyStoreModalAction,
  closeMyStoreModalAction,
  openCherryBoxRegisterAction,
  closeCherryBoxRegisterAction,
} = actions;
export default reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeId: '',
  open: false,
  pickUpStartTime: '',
  pickUpEndTime: '',
  cherryPoint: 0,
  storeDescription: '',
  cherryboxDescription: '',
  allergies: [],
  images: [],
  instagram: '',
};

export const storeSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    logoutStoreAction: state => {
      return {
        ...state,
        storeId: '',
        open: false,
        pickUpStartTime: '',
        pickUpEndTime: '',
        cherryPoint: 0,
        storeDescription: '',
        cherryboxDescription: '',
        allergies: [],
        images: [],
        instagram: '',
      };
    },

    setCherryPointAction: (state, action) => {
      return {
        ...state,
        cherryPoint: action.payload,
      };
    },
    setModifiableAction: (state, action) => {
      return {
        ...state,
        storeDescription: action.payload.storeDescription,
        pickUpStartTime: action.payload.pickUpStartTime,
        pickUpEndTime: action.payload.pickUpEndTime,
        cherryboxDescription: action.payload.cherryboxDescription,
        allergies: action.payload.allergies,
        images: action.payload.images,
        instagram: action.payload.instagram,
      };
    },

    getStoreInfoAction: (state, action) => {
      return {
        ...state,
        storeId: action.payload.storeId,
        open: action.payload.open,
        pickUpStartTime: action.payload.pickUpStartTime,
        pickUpEndTime: action.payload.pickUpEndTime,
        cherryPoint: action.payload.cherryPoint,
        storeDescription: action.payload.storeDescription,
        cherryboxDescription: action.payload.cherryboxDescription,
        allergies: action.payload.allergies,
        images: action.payload.images,
        instagram: action.payload.instagram,
      };
    },
    putStoreInfoAction: (state, action) => {
      const key = Object.keys(action.payload)[0];
      const value = action.payload[key];

      if (key in state) {
        return {
          ...state,
          [key]: value,
        };
      }

      return state;
    },
    openStoreAction: state => {
      return {
        ...state,
        open: true,
      };
    },

    closeStoreAction: state => {
      return {
        ...state,
        open: false,
      };
    },
  },
});

const { reducer, actions } = storeSlice;
export const {
  setCherryPointAction,
  setModifiableAction,
  getStoreInfoAction,
  putStoreInfoAction,
  openStoreAction,
  closeStoreAction,
  logoutStoreAction,
} = actions;
export default reducer;

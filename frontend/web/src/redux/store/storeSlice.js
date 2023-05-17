import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeId: '',
  open: false,
  pickUpStartTime: '',
  pickUpEndTime: '',
  cherryPoint: 0,
  storeDescription: '',
  cherryBoxDescription: '',
  allergies: [],
  images: [],
  instagram: '',
};

export const storeSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setOpenAction: (state, action) => {
      return {
        ...state,
        open: action.payload,
      };
    },
    loginStoreAction: (state, action) => {
      // console.log('loginStoreAction: ', action.payload);
      return {
        ...state,
        storeId: action.payload.storeId,
        open: action.payload.open,
        cherryPoint: action.payload.cherryPoint,
      };
    },
    logoutStoreAction: state => {
      return {
        ...state,
        storeId: '',
        open: false,
        pickUpStartTime: '',
        pickUpEndTime: '',
        cherryPoint: 0,
        storeDescription: '',
        cherryBoxDescription: '',
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
        cherryBoxDescription: action.payload.cherryBoxDescription,
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
        cherryBoxDescription: action.payload.cherryBoxDescription,
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
  loginStoreAction,
  setCherryPointAction,
  setModifiableAction,
  getStoreInfoAction,
  putStoreInfoAction,
  openStoreAction,
  closeStoreAction,
  logoutStoreAction,
  setOpenAction,
} = actions;
export default reducer;

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
      console.log(action.payload);
      const key = Object.keys(action.payload)[0];
      const value = action.payload[key];

      if (key in state) {
        console.log('key:', key);
        return {
          ...state,
          [key]: value,
        };
      }

      return state;
    },
  },
});

const { reducer, actions } = storeSlice;
export const { getStoreInfoAction, putStoreInfoAction } = actions;
export default reducer;

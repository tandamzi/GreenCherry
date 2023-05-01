import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeId: '',
  open: false,
  pickUpStartTime: '',
  pickUpEndTime: '',
  chrryPoint: 0,
  storeDescription: '',
  cherryboxDescription: '',
  allergies: [],
  images: [],
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    getStoreInfoAction: (state, action) => {
      return {
        ...state,
        storeId: action.payload.storeId,
        open: action.payload.open,
        pickUpStartTime: action.payload.pickUpStartTime,
        pickUpEndTime: action.payload.pickUpEndTime,
        chrryPoint: action.payload.chrryPoint,
        storeDescription: action.payload.storeDescription,
        cherryboxDescription: action.payload.cherryboxDescription,
        allergies: action.payload.allergies,
        images: action.payload.images,
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
  },
});

const { reducer, actions } = storeSlice;
export const { getStoreInfoAction, putStoreInfoAction } = actions;
export default reducer;

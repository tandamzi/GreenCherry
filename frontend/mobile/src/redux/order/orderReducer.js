import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderState: 'none',
  orderQunatity: 0,
  storeId: '',
  priceAfterDiscount: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveOrderState: (state, action) => {
      return {
        ...state,
        orderState: action.payload,
      };
    },
    saveOrders: (state, action) => {
      return {
        ...state,
        orderState: action.payload.orderState,
        orderQunatity: action.payload.orderQunatity,
        storeId: action.payload.storeId,
        priceAfterDiscount: action.payload.priceAfterDiscount,
      };
    },
    initOrder: state => {
      return {
        ...state,
        orderState: 'none',
        orderQunatity: 0,
        storeId: '',
        priceAfterDiscount: '',
      };
    },
  },
});

export const { saveOrderState, saveOrders, initOrder } = orderSlice.actions;
export default orderSlice.reducer;

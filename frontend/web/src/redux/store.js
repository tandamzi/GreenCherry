import { configureStore, combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';

import member from './member/memberSlice';
import modal from './modal/modalSlice';
import modify from './store/modifySlice';
import business from './store/storeSlice';

const combinedReducer = combineReducers({
  member,
  business,
  modify,
  modal,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['member', 'business', 'modal'],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;

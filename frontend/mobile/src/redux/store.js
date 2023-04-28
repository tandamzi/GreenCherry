import { configureStore, combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';

import member from './member/memberReducer';

const combinedReducer = combineReducers({
  member,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['member'],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
});

/* eslint-disable no-unused-expressions */
process.env.NODE_ENV === 'development';

export default store;

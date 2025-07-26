import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from './Slices/authSlice';
import cartReducer from './Slices/cartSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const createStore = (uid) => {
  const rootReducer = combineReducers({
    auth: authReducer,
    cartItem: cartReducer,
  });
  if (!uid) {
    return configureStore({ reducer: rootReducer }); // No persist
  }
  const persistConfig = {
    key: `${uid}`,
    storage,
    whitelist: ["cartItem"],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  return configureStore({ reducer: persistedReducer });
}

export default createStore;

// src/store/addCartStore.js
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./Slices/cartSlice";  // Adjust path if needed
import store from "./store";  // Import your configured store

export const addCartReducer = (userId) => {
  const persistConfig = {
    key: `cart-${userId}`, // This gives the cart a unique storage name
    storage,
  };
  const persistedCartReducer = persistReducer(persistConfig, cartSlice);
  store.injectReducer("cartItem", persistedCartReducer);
};

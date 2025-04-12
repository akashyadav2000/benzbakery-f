import { configureStore } from "@reduxjs/toolkit";
import cakeItemsSlice from "./cakeItemsSlice";
import pastryItemsSlice from "./pastryItemsSlice ";
import cupCakeItemsSlice from "./cupCakeItemsSlice";
import weddingCakeItemsSlice from "./weddingCakeItemsSlice";
import cartSlice from "./cartSlice";
import productDetailsSlice from "./productDetailsSlice";
import authReducer from "./authSlice";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

// Save only auth state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      auth: state.auth
    });
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.warn("Could not save state to localStorage", err);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    cakeItems: cakeItemsSlice.reducer,
    pastryItems: pastryItemsSlice.reducer,
    cupCakeItems: cupCakeItemsSlice.reducer,
    weddingCakeItems: weddingCakeItemsSlice.reducer,
    cart: cartSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    auth: authReducer,
  },
  preloadedState
});

// Subscribe to store changes and persist auth state
store.subscribe(() => {
  saveState(store.getState());
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import { WEDDING_CAKE_ITEMS } from "../Data/weddingCakeItems";

const weddingCakeItemsSlice = createSlice({
  name: "weddingCakeItems",
  initialState: WEDDING_CAKE_ITEMS,

  reducers: {
    addInitialItems: (store, action) => {
      return store;
    },
  },
});

export const weddingCakeItemsSActions = weddingCakeItemsSlice.actions;

export default weddingCakeItemsSlice;

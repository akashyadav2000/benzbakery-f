import { createSlice } from "@reduxjs/toolkit";
import { CAKE_ITEMS } from "../Data/cakeItems";

const cakeItemsSlice = createSlice({
  name: "cakeItems",
  initialState: CAKE_ITEMS,

  reducers: {
    addInitialItems: (store, action) => {
      return store;
    },
  },
});

export const cakeItemsSActions = cakeItemsSlice.actions;

export default cakeItemsSlice;

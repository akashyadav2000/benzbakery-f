import { createSlice } from "@reduxjs/toolkit";
import { PASTRY_ITEMS } from "../Data/pastryItems";

const pastryItemsSlice = createSlice({
  name: "pastryItems",
  initialState: PASTRY_ITEMS,

  reducers: {
    addInitialItems: (store, action) => {
      return store;
    },
  },
});

export const pastryItemsSActions = pastryItemsSlice.actions;

export default pastryItemsSlice;

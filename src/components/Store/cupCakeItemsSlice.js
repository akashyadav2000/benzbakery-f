import { createSlice } from "@reduxjs/toolkit";
import { CUP_CAKE_ITEMS } from "../Data/cupCakeItems";

const CupCakeItemsSlice = createSlice({
  name: "CupCakeItems",
  initialState: CUP_CAKE_ITEMS,

  reducers: {
    addInitialItems: (store, action) => {
      return store;
    },
  },
});

export const CupCakeItemsSActions = CupCakeItemsSlice.actions;

export default CupCakeItemsSlice;

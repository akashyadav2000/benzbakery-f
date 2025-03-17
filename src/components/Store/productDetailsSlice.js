import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: [],
  reducers: {
    addToProductDetails: (state, action) => {
      return action.payload; // Replace the current state with the new item
    },
  },
});

export const productDetailsActions = productDetailsSlice.actions;
export default productDetailsSlice;

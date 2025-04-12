import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  purchaseHistory: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.purchaseHistory = action.payload.purchaseHistory || [];
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.purchaseHistory = [];
      localStorage.removeItem('reduxState'); // Clear persisted state on logout
    },
    addPurchase(state, action) {
      action.payload.forEach((newPurchase) => {
        const existingItem = state.purchaseHistory.find(
          (item) =>
            item.id === newPurchase.id &&
            item.selectedSize === newPurchase.selectedSize &&
            item.selectedDate === newPurchase.selectedDate &&
            item.selectedTimeSlot === newPurchase.selectedTimeSlot &&
            item.cakeMessage === newPurchase.cakeMessage
        );

        if (existingItem) {
          existingItem.quantity += newPurchase.quantity;
        } else {
          state.purchaseHistory.push(newPurchase);
        }
      });
    },
    setPurchaseHistory(state, action) {
      state.purchaseHistory = action.payload;
    },
  },
});

export const { login, logout, addPurchase, setPurchaseHistory } = authSlice.actions;

// Thunk to fetch purchase history
export const fetchPurchaseHistory = (email) => async (dispatch) => {
  try {
    const response = await axios.get(`https://benz-1vam.onrender.com/get-purchase-history/${email}`);
    if (response.data.status === "Success") {
      dispatch(setPurchaseHistory(response.data.purchaseHistory));
    }
  } catch (error) {
    console.error("Error fetching purchase history:", error);
  }
};

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectPurchaseHistory = (state) => state.auth.purchaseHistory;

export default authSlice.reducer;
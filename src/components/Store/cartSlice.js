import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { id, selectedSize, selectedDate, selectedTimeSlot, cakeMessage, flavor } = action.payload;

      // Create a unique key combining id, selectedSize, selectedDate, selectedTimeSlot, and cakeMessage
      const uniqueKey = `${id}-${selectedSize}-${selectedDate}-${selectedTimeSlot}-${cakeMessage}`;

      // Find if the item with the same unique key already exists
      const existingItem = state.find(
        (item) =>
          `${item.id}-${item.selectedSize}-${item.selectedDate}-${item.selectedTimeSlot}-${item.cakeMessage}` === uniqueKey
      );

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if the same item exists
      } else {
        state.push({
          id,
          selectedSize,
          selectedDate,
          selectedTimeSlot,
          cakeMessage,
          flavor,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedSize, selectedDate, selectedTimeSlot, cakeMessage } = action.payload;

      // Create a unique key combining id, selectedSize, selectedDate, selectedTimeSlot, and cakeMessage
      const uniqueKey = `${id}-${selectedSize}-${selectedDate}-${selectedTimeSlot}-${cakeMessage}`;

      // Filter out the item with the matching unique key
      return state.filter(
        (item) =>
          `${item.id}-${item.selectedSize}-${item.selectedDate}-${item.selectedTimeSlot}-${item.cakeMessage}` !== uniqueKey
      );
    },
    removeSingleItem: (state, action) => {
      const { id, selectedSize, selectedDate, selectedTimeSlot, cakeMessage } = action.payload;

      // Create a unique key combining id, selectedSize, selectedDate, selectedTimeSlot, and cakeMessage
      const uniqueKey = `${id}-${selectedSize}-${selectedDate}-${selectedTimeSlot}-${cakeMessage}`;

      // Find the item with the same unique key
      const index = state.findIndex(
        (item) =>
          `${item.id}-${item.selectedSize}-${item.selectedDate}-${item.selectedTimeSlot}-${item.cakeMessage}` === uniqueKey
      );

      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
    clearCart: (state) => {
      state.length = 0; // Clears the cart
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;

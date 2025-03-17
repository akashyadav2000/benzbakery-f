import React from "react";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

function Cart() {
  const cartItems = useSelector((state) => state.cart); // Get cart items from Redux store
  const categories = [
    "cakeItems",
    "pastryItems",
    "cupCakeItems",
    "weddingCakeItems",
  ];

  // Fetch all items from categories and match with cartItems
  const finalItems = categories.flatMap((category) => {
    const items = useSelector((state) => state[category]);
    return items.filter((item) =>
      cartItems.some((cartItem) => cartItem.id === item.id)
    );
  });

  return (
    <main className="min-h-screen w-full px-[2%] sm:px-[3%] md:px-[5%] lg:px-[4%] xl:px-[5%] 2xl:px-[11%] py-24 bg-gray-100">
      <div className=" flex flex-col lg:flex-row gap-5 lg:gap-6 xl:gap-7 2xl:gap-8">
        {/* Cart Items Section */}
        <div className="flex-1 bg-white rounded-lg shadow-md px-0 sm:px-3">
          <h2 className="text-2xl poppins font-medium text-gray-800 border-b border-gray-700 pl-3 py-4">
            Shopping Cart
          </h2>
          {cartItems.map((cartItem) => {
            // Find the corresponding item in finalItems
            const item = finalItems.find((item) => item.id === cartItem.id);
            if (!item) return null; // Skip if item is not found

            return (
              <CartItem
                key={`${cartItem.id}-${cartItem.selectedSize}-${cartItem.selectedDate}-${cartItem.selectedTimeSlot}-${cartItem.cakeMessage}`} // Use a unique key
                item={item}
                cartItemDetails={cartItem} // Pass cart item details
              />
            );
          })}
        </div>

        {/* Cart Summary Section */}
        <div className="w-full lg:w-fit xl:w-99">
          <CartSummary />
        </div>
      </div>
    </main>
  );
}

export default Cart;

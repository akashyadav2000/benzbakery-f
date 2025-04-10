import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { selectUser } from "../Store/authSlice";
import { cartActions } from "../Store/cartSlice";
import { addPurchase } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";


const CartSummary = () => {
  const cartItems = useSelector((state) => state.cart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    "cakeItems",
    "pastryItems",
    "cupCakeItems",
    "weddingCakeItems",
  ];

  // Add state for address and pincode
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  // Fetch all items from categories and match with cartItems
  const finalItems = categories.flatMap((category) => {
    const items = useSelector((state) => state[category]);
    return items.filter((item) =>
      cartItems.some((cartItem) => cartItem.id === item.id)
    );
  });

  // Calculate the total value of all items in the cart
  const totalValue = cartItems.reduce((accumulator, cartItem) => {
    const item = finalItems.find((item) => item.id === cartItem.id);
    const selectedPrice =
      item.priceOptions[cartItem.selectedSize] || item.defaultPrice;
    return accumulator + selectedPrice * cartItem.quantity;
  }, 0);

  // Calculate the total number of items in the cart
  const totalItem = cartItems.reduce(
    (accumulator, cartItem) => accumulator + cartItem.quantity,
    0
  );

  const CONVENIENCE_FEES = 99;
  const finalPayment = totalValue + CONVENIENCE_FEES;

  // Function to save purchase history to the backend
  const savePurchaseHistory = async (email, purchaseData) => {
    try {
      const response = await axios.post(
        "https://benz-1vam.onrender.com/save-purchase-history",
        {
          email,
          purchaseData,
        }
      );
      if (response.data.status === "Success") {
        console.log("Purchase history saved successfully");
      }
    } catch (error) {
      console.error("Error saving purchase history:", error);
    }
  };

  const handleProceedToBuy = async () => {
    // Validate address and pincode
    if (!address.trim() || !pincode.trim()) {
      setError("Please enter both address and pincode");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    setError(""); // Clear any previous errors


    try {
      const { data: order } = await axios.post(
        "https://benz-1vam.onrender.com/create-order",
        {
          amount: finalPayment,
          receipt: "receipt_" + new Date().getTime(),
        }
      );

      // Prepare purchase data
      const purchaseData = cartItems.map((cartItem) => {
        const item = finalItems.find((item) => item.id === cartItem.id);

        // Format selectedSize for display
        let weightPiece;
        if (
          item.category === "cakeItems" ||
          item.category === "weddingCakeItems"
        ) {
          weightPiece = "1 kg"; // For cakes and wedding cakes
        } else if (
          item.category === "pastryItems" ||
          item.category === "cupCakeItems"
        ) {
          weightPiece = `${cartItem.selectedSize} pieces`; // For pastries and cupcakes
        } else {
          weightPiece = cartItem.selectedSize; // Fallback to selectedSize
        }

        return {
          id: item.id,
          name: item.item, // Include item name
          image: item.image, // Include item image
          selectedSize: weightPiece, // Use the formatted weight/piece
          price: item.priceOptions[cartItem.selectedSize] || item.defaultPrice, // Include price
          quantity: cartItem.quantity,
          total:
            (item.priceOptions[cartItem.selectedSize] || item.defaultPrice) *
            cartItem.quantity, // Include total
          selectedDate: cartItem.selectedDate,
          selectedTimeSlot: cartItem.selectedTimeSlot,
          cakeMessage: cartItem.cakeMessage,
          address, // Add address to each item
          pincode, // Add pincode to each item
        };
      });



      // Debug: Log the prepared purchase data
      console.log("Purchase Data:", purchaseData);

      // Dispatch all purchases to purchase history
      dispatch(addPurchase(purchaseData));

      // Save purchase history to the backend
      await savePurchaseHistory(user.email, purchaseData);

      // Razorpay options
      const options = {
        key: "rzp_test_zmbzU3ptbDW9vg",
        amount: order.amount,
        currency: order.currency,
        name: "Benz Bakery",
        description: "Complete your purchase",
        order_id: order.id,
        handler: function (response) {
          console.log("Payment successful:", response);

          // Clear the cart after successful payment
          dispatch(cartActions.clearCart());

          // Navigate to UserProfile
          navigate("/UserProfile");
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Open Razorpay payment window
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error while initiating payment:", error);
    }
  };


  return (
    <div className="bg-white poppins rounded-lg shadow-md py-4 px-5">
      <h2 className="text-[17px] lg:text-[18px] xl:text-[19px] 2xl:[20px] font-medium mb-3">
        PRICE DETAILS <span className="green-text">({totalItem} Items)</span>
      </h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="green-text text:[15px] lg:text-[16px] xl:text-[17px] font-medium">Total MRP</span>
          <span className="text-gray-800 text:[15px] lg:text-[16px] xl:text-[17px] font-medium">₹ {totalValue}</span>
        </div>
        <div className="flex justify-between">
          <span className="green-text font-medium text:[15px] lg:text-[16px] xl:text-[17px]">Convenience Fee</span>
          <span className="text-gray-800 font-medium text:[15px] lg:text-[16px] xl:text-[17px]">₹ {CONVENIENCE_FEES}</span>
        </div>
        <hr className="my-2 border-black" />
        <div className="flex justify-between">
          <span className="text-[18px] font-medium greent-text">
            Total Amount
          </span>
          <span className="text-[18px] font-medium text-orange-600">
            ₹ {finalPayment}
          </span>
        </div>
      </div>

      {/* Add Address and Pincode fields */}
      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address *
          </label>
          <textarea
            id="address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your complete delivery address"
            required
          />
        </div>

        <div>
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
            Pincode *
          </label>
          <input
            type="text"
            id="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter 6-digit pincode"
            maxLength={6}
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-1">{error}</div>
        )}
      </div>

      <button
        onClick={handleProceedToBuy}
        className="mt-[8px] w-full py-[5px] text-[18px] font-medium text-white bg-gradient-to-r from-pink-400 to-purple-400 rounded-md hover:from-blue-400 hover:to-cyan-400 transition-all"
      >
        Proceed to Buy
      </button>
    </div>
  );
};

export default CartSummary;

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
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [number, setNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Add state for error messages
  const [errorMessages, setErrorMessages] = useState({
    street: "",
    landmark: "",
    pincode: "",
    number: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const validateMumbaiPincode = async (pincode) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

      if (response.data[0].Status === "Success") {
        const postOffices = response.data[0].PostOffice;
        // Check if any of the post offices are in Mumbai
        return postOffices.some(office =>
          office.District.toLowerCase().includes("mumbai") ||
          office.State.toLowerCase().includes("maharashtra")
        );
      }
      return false;
    } catch (error) {
      console.error("Error validating pincode:", error);
      return false;
    }
  };

  const validateInputs = async () => {

    const isMumbaiPincode = await validateMumbaiPincode(pincode);

    const updatedErrorMessages = {
      street:
        /^[A-Za-z][A-Za-z0-9\s,.'-]*$/.test(street) && street.length <= 50
          ? ""
          : "Please enter a valid Street",

      landmark:
        /^[A-Za-z][A-Za-z0-9\s,.'-]*$/.test(landmark) && landmark.length <= 50
          ? ""
          : "Please enter a valid Landmark",
      pincode:
        /^\d{6}$/.test(pincode)
          ? isMumbaiPincode
            ? ""
            : "We currently only deliver in Mumbai"
          : "Please enter a valid 6-digit pincode",
      number:
        /^\d{10}$/.test(number) && number.length <= 10
          ? ""
          : "Please enter a valid 10-digit number"
    };

    const isValid = Object.values(updatedErrorMessages).every(
      (message) => message === ""
    );

    setErrorMessages(updatedErrorMessages);
    return isValid;
  };

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
    setSubmitted(true);
    const isValid = await validateInputs(); // Make sure to await the validation

    if (!isValid) {
      return; // Exit if validation fails
    }

    setIsProcessing(true); // Start loading only after validation passes

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
          street, // Add address to each item
          landmark, // Add address to each item
          pincode, // Add pincode to each item
          number, // Add address to each item
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

          setIsProcessing(false); // Stop loading on success

          // Clear the cart after successful payment
          dispatch(cartActions.clearCart());

          // Navigate to UserProfile
          navigate("/UserProfile");
        },
        modal: {
          ondismiss: function () {
            // This runs when user closes the payment modal
            setIsProcessing(false);
            console.log("Payment modal closed by user");
          }
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

      razorpay.on('payment.failed', function (response) {
        setIsProcessing(false);
        console.error("Payment failed:", response.error);
        // Optional: Show error message to user
        alert(`Payment failed: ${response.error.description}`);
      });

      razorpay.open();

    } catch (error) {
      setIsProcessing(false);
      console.error("Error while initiating payment:", error);
      // Optional: Show error message to user
      alert("Error initiating payment. Please try again.");
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
        <hr className="my-[6px] border-black" />
        <div className="flex justify-between">
          <span className="text-[17px] font-medium greent-text">
            Total Amount
          </span>
          <span className="text-[17px] font-medium text-orange-600">
            ₹ {finalPayment}
          </span>
        </div>
      </div>

      {/* Add Address and Pincode fields */}
      <h2 className="text-[17px] lg:text-[18px] xl:text-[19px] 2xl:[20px] font-medium mt-3 text-pink-500">
        Delivery Details
      </h2>

      <div className="mt-2 space-y-3">
        <div>
          <label htmlFor="street" className="block text-[14.5px] lg:text-[15px] xl:text-[15.5px] 2xl:text-[16.5px] font-medium text-gray-800 mb-1">
            Street Name
          </label>
          <input
            type="text"
            id="street"
            value={street}
            maxLength={50}
            onChange={(e) => setStreet(e.target.value)}
            className={`w-full px-3 py-2 h-9 text-[14px] lg:text-[15px] xl:text-[15.5px] 2xl:text-[16px] rounded-md border ${errorMessages.street && submitted
              ? "border-red-500"
              : submitted
                ? "border-green-500"
                : "border-black"
              } bg-[whitesmoke] focus:border-green-500 outline-none`}
            placeholder="Enter your street name"
          />
          {submitted && errorMessages.street && (
            <p className="text-red-500 text-[12.2px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] font-medium h-3">
              {errorMessages.street}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="landmark" className="block text-[14.5px] lg:text-[15px] xl:text-[15.5px] 2xl:text-[16.5px] font-medium text-gray-800 mb-1">
            Landmark
          </label>
          <input
            id="landmark"
            value={landmark}
            maxLength={50}
            onChange={(e) => setLandmark(e.target.value)}
            className={`w-full px-3 py-2 h-9 rounded-md border ${errorMessages.landmark && submitted
              ? "border-red-500"
              : submitted
                ? "border-green-500"
                : "border-black"
              } bg-[whitesmoke] focus:border-green-500 outline-none`}
            placeholder="Enter your landmark"
          />
          {submitted && errorMessages.landmark && (
            <p className="text-red-500 text-[12.2px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] font-medium h-3">
              {errorMessages.landmark}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="pincode" className="block text-[14.5px] lg:text-[15px] xl:text-[15.5px] 2xl:text-[16.5px] font-medium text-gray-800 mb-1">
            Pincode
          </label>
          <input
            type="number"
            id="pincode"
            value={pincode}
            maxLength={6}
            onChange={(e) => {
              if (e.target.value.length <= 6) {  // For pincode (6 digits)
                setPincode(e.target.value);
              }
            }}
            className={`w-full px-3 py-2 h-9 rounded-md border ${errorMessages.pincode && submitted
              ? "border-red-500"
              : submitted
                ? "border-green-500"
                : "border-black"
              } bg-[whitesmoke] focus:border-green-500 outline-none`}
            placeholder="Ex. 400078"
          />
          {submitted && errorMessages.pincode && (
            <p className="text-red-500 text-[12.2px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] font-medium h-3">
              {errorMessages.pincode}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="number" className="block text-[14.5px] lg:text-[15px] xl:text-[15.5px] 2xl:text-[16.5px] font-medium text-gray-800 mb-1">
            Mobile Number
          </label>
          <input
            type="number"
            id="number"
            value={number}
            maxLength={10}
            onChange={(e) => {
              if (e.target.value.length <= 10) {  // For mobile (10 digits)
                setNumber(e.target.value);
              }
            }}
            className={`w-full px-3 py-2 h-9 rounded-md border ${errorMessages.number && submitted
              ? "border-red-500"
              : submitted
                ? "border-green-500"
                : "border-black"
              } bg-[whitesmoke] focus:border-green-500 outline-none`}
            placeholder="Enter Mobile Number"
          />
          {submitted && errorMessages.number && (
            <p className="text-red-500 text-[12.2px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] font-medium h-3">
              {errorMessages.number}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={handleProceedToBuy}
        disabled={cartItems.length === 0 || isProcessing}
        className={`
    mt-5 w-full py-[5px] text-[18px] font-medium text-white rounded-md transition-all
    flex items-center justify-center gap-2
    ${cartItems.length === 0 || isProcessing
            ? 'bg-gray-400 cursor-not-allowed opacity-80'
            : 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-blue-400 hover:to-cyan-400 cursor-pointer'
          }
  `}
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          'Proceed to Buy'
        )}
      </button>
    </div>
  );
};

export default CartSummary;
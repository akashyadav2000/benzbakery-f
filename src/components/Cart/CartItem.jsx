import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { cartActions, saveCartToServer } from "../Store/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CartItem({ item, cartItemDetails }) {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart);

  // Calculate the price based on the selected size
  const selectedPrice =
    item.priceOptions[cartItemDetails.selectedSize] || item.defaultPrice;
  const totalPrice = selectedPrice * (cartItemDetails.quantity || 1);

  const handleRemoveItem = () => {
    dispatch(
      cartActions.removeFromCart({
        id: item.id,
        selectedSize: cartItemDetails.selectedSize,
        selectedDate: cartItemDetails.selectedDate,
        selectedTimeSlot: cartItemDetails.selectedTimeSlot,
        cakeMessage: cartItemDetails.cakeMessage,
      }));

    if (isAuthenticated) {
      const updatedCart = cartItems.filter(cartItem =>
        !(cartItem.id === item.id &&
          cartItem.selectedSize === cartItemDetails.selectedSize &&
          cartItem.selectedDate === cartItemDetails.selectedDate &&
          cartItem.selectedTimeSlot === cartItemDetails.selectedTimeSlot &&
          cartItem.cakeMessage === cartItemDetails.cakeMessage)
      );
      dispatch(saveCartToServer(user.email, updatedCart));
    }
  };

  const handleIncrement = () => {
    if ((cartItemDetails.quantity || 1) < 5) {
      dispatch(
        cartActions.addToCart({
          id: item.id,
          selectedSize: cartItemDetails.selectedSize,
          selectedDate: cartItemDetails.selectedDate,
          selectedTimeSlot: cartItemDetails.selectedTimeSlot,
          cakeMessage: cartItemDetails.cakeMessage,
          flavor: cartItemDetails.flavor,
        }));

      if (isAuthenticated) {
        const updatedCart = cartItems.map(cartItem =>
          cartItem.id === item.id &&
            cartItem.selectedSize === cartItemDetails.selectedSize &&
            cartItem.selectedDate === cartItemDetails.selectedDate &&
            cartItem.selectedTimeSlot === cartItemDetails.selectedTimeSlot &&
            cartItem.cakeMessage === cartItemDetails.cakeMessage
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        dispatch(saveCartToServer(user.email, updatedCart));
      }
    }
  };

  const handleDecrement = () => {
    dispatch(
      cartActions.removeSingleItem({
        id: item.id,
        selectedSize: cartItemDetails.selectedSize,
        selectedDate: cartItemDetails.selectedDate,
        selectedTimeSlot: cartItemDetails.selectedTimeSlot,
        cakeMessage: cartItemDetails.cakeMessage,
      }));

    if (isAuthenticated) {
      const updatedCart = cartItems.map(cartItem =>
        cartItem.id === item.id &&
          cartItem.selectedSize === cartItemDetails.selectedSize &&
          cartItem.selectedDate === cartItemDetails.selectedDate &&
          cartItem.selectedTimeSlot === cartItemDetails.selectedTimeSlot &&
          cartItem.cakeMessage === cartItemDetails.cakeMessage
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ).filter(cartItem => cartItem.quantity > 0);
      dispatch(saveCartToServer(user.email, updatedCart));
    }
  };

  return (
    <div className="poppins flex flex-row items-start md:items-center gap-2 md:gap-4 px-[6px] py-2 sm:p-4 border-b border-gray-400 last:border-b-0 relative">
      {/* Image */}
      <div className="max-[450px]:w-23 max-[450px]:h-30 w-27 h-28 sm:w-30 sm:h-31 lg:w-31 lg:h-32 xl:w-33 xl:h-34 2xl:w-34 2xl:h-35 flex-shrink-0">
        <LazyLoadImage
          src={item.image}
          alt={item.item}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>

      {/* Details */}
      <div className="flex-1 font-medium">
        <h2 className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] text-black max-[450px]:leading-[16px]">
          {item.item}
        </h2>
        <p className="text-[13px] sm:text-[14px] lg:text-[15px] green-text xl:text-[16px] max-[450px]:leading-[16px] sm:leading-[20px] md:leading-[22px]">
          Flavor :- <span className="text-gray-700">{cartItemDetails.flavor}</span>
        </p>
        <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] green-text max-[450px]:leading-[16px] sm:leading-[20px] md:leading-[22px]">
          Servings :- <span className="text-gray-700">{cartItemDetails.selectedSize}</span>
        </p>
        <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] green-text max-[450px]:leading-[16px] sm:leading-[20px] md:leading-[22px]">
          Delivery Date :- <span className="text-gray-700">{cartItemDetails.selectedDate || "Not selected"}</span>
        </p>
        <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] green-text max-[450px]:leading-[16px] sm:leading-[20px] md:leading-[22px]">
          Delivery Time :- <span className="text-gray-700">{cartItemDetails.selectedTimeSlot || "Not selected"}</span>
        </p>
        <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] green-text max-[450px]:leading-[16px] sm:leading-[20px] md:leading-[22px]">
          Message :- <span className="text-gray-700">{cartItemDetails.cakeMessage || "No message"}</span>
        </p>

        {/* Quantity Controls and Price for Small Screens */}
        <div className="min-[450px]:hidden flex flex-row items-center justify-between mt-[3px] pr-[2px]">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className="p-[3px] bg-gray-200 hover:bg-gray-300"
            >
              <Minus className="size-[14px]" />
            </button>
            <span className="text-[14px] px-1 font-medium">
              {cartItemDetails.quantity || 1}
            </span>
            <button
              onClick={handleIncrement}
              className="p-[3px] bg-gray-200 hover:bg-gray-300"
            >
              <Plus className="size-[14px]" />
            </button>
          </div>

          {/* Price */}
          <span className="text-[14px] font-medium text-orange-600">
            ₹ {totalPrice}
          </span>
        </div>
      </div>

      {/* Delete Button (Top Right) */}
      <button
        onClick={handleRemoveItem}
        className="absolute top-[10px] sm:top-3 md:top-4 max-[450px]:right-[6px] right-2 sm:right-3 md:right-4 text-green-950 hover:text-red-600"
      >
        <Trash2 className="size-[18px] sm:size-[20px] lg:size-[21px] xl:size-[23px]" />
      </button>

      {/* Quantity and Price (Bottom Right for Larger Screens) */}
      <div className="max-[450px]:hidden flex flex-col items-center gap-2 mt-4 absolute bottom-2 md:bottom-4 right-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <Minus className="size-[15px] xl:size-[16px]" />
          </button>
          <span className="text-[15px] xl:text-[16px] px-1 font-medium">
            {cartItemDetails.quantity || 1}
          </span>
          <button
            onClick={handleIncrement}
            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <Plus className="size-[15px] xl:size-[16px]" />
          </button>
        </div>
        <span className="text-[15px] xl:text-[16px] font-medium text-orange-600">
          ₹ {totalPrice}
        </span>
      </div>
    </div>
  );
}

export default CartItem;
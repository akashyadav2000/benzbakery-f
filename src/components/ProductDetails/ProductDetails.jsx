import React, { useState, useEffect } from "react";
import { ChevronRight, IndianRupee } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../Store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../Store/authSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ProductDetails({ item }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const sizes = Object.keys(item.priceOptions);
  const defaultSize = sizes[sizes.length - 1]; // Select the last size by default

  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [pincode, setPincode] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(null);
  const [cakeMessage, setCakeMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(true); // Track form validity

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  }, []);

  const handleAddToCart = () => {
    // Validate time and date
    if (!selectedTimeSlot || !selectedDate) {
      setIsFormValid(false); // Show error message
      return;
    }

    setIsFormValid(true); // Hide error message

    if (isAuthenticated) {
      dispatch(
        cartActions.addToCart({
          id: item.id,
          selectedSize, // Pass the selected size
          selectedDate, // Pass the selected date
          selectedTimeSlot, // Pass the selected time slot
          cakeMessage, // Pass the cake message
          flavor: item.flavor,
        })
      );
      navigate("/Cart");
    } else {
      navigate("/Login");
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const checkLocation = () => {
    const allowedPincodes = ["400001", "400002", "400003", "400078"];
    setIsDeliveryAvailable(allowedPincodes.includes(pincode));
  };

  return (
    <>
      <main
        className="product-details-bg roboto-serif pt-20 pb-4 lg:pt-28 lg:pb-14 min-h-screen flex items-center justify-center px-[4%] min-[1024px]:px-[4%]  min-[1280px]:px-[6%] min-[1536px]:px-[10%] min-[1725px]:px-[15%]  "
        id={item.id}
      >
        <div className="flex flex-col lg:flex-row w-full items-center lg:items-start rounded-lg gap-[4%]">
          <div className="w-full max-[450px]:w-[200px] max-[640px]:w-[250px] sm:max-w-[300px] md:max-w-[330px] lg:max-w-[330px] xl:max-w-[360px] 2xl:max-w-[360px] flex justify-center">
            <LazyLoadImage
              src={item.image}
              alt={item.item}
              // effect="blur"
              className="w-full max-[450px]:h-[200px] max-[640px]:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] xl:h-[472px] 2xl:h-[495px]  object-cover white-shadow rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="w-auto flex flex-col gap-1 max-[450px]:mt-5 mt-7 lg:mt-0">
            {/* Title & Price */}
            <h1 className="leading-none max-[450px]:text-[19px] text-[20px] sm:text-[22px]  md:text-[24px] xl:text-[26px] 2xl:text-[30px] font-medium flex items-center poppins green-text ]">
              {item.item}
              <IndianRupee
                // size={28}
                className="font-medium items-center max-[450px]:size-[18px] size-[19px] sm:size-[21px]  md:size-[22px] xl:size-6 orange-text ml-4"
              />
              <span className="orange-text">
                {item.priceOptions[selectedSize]}
              </span>
            </h1>

            {/* Serving Size Selection */}
            <div>
              <span className="text-[15.5px] sm:text-[16px] md:text-[17px] xl:text-[18px] 2xl:text-[20px] font-medium orange-text">Serving</span>
              <div className="flex max-[450px]:gap-2 gap-3 max-[450px]:mt-1 mt-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-2 py-1 border ${selectedSize === size
                      ? "orange-bg text-white"
                      : "bg-white green-text "
                      } rounded-sm text-[13.5px] sm:text-[14px] xl:text-[16px] font-medium `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Check & Flavor Selection */}
            <div className="flex max-[450px]:flex-col flex-row max-[450px]:items-start items-start">
              {/* Delivery Location */}
              <div className="w-full max-[450px]:mt-1 mt-2">
                <span className="text-[15px] sm:text-[16px] md:text-[17px] xl:text-[18px] 2xl:text-[19px] font-medium orange-text">Delivery Location</span>
                <div className="flex items-center gap-2 ">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="border h-[31px] md:h-[32px] px-1 rounded-sm w-[200px] green-text "
                  />
                  <button
                    onClick={checkLocation}
                    className="orange-bg border-white border-1 text-white px-2 py-[4px] rounded-sm text-[14.5px] sm:text-[15px] md:text-[16px] "
                  >
                    Check
                  </button>
                </div>

                {/* Fixed Layout for Pincode Message */}
                <div className=""> {/* Fixed height to prevent layout shift */}
                  {isDeliveryAvailable === false && (
                    <p className="text-red-500  leading-none max-[450px]:text-[12px] text-[13px] md:text-[14px] pt-[3px]">Delivery only available in Mumbai.</p>
                  )}
                  {isDeliveryAvailable === true && (
                    <p className="text-green-500 max-[450px]:text-[12px] text-[13px] md:text-[14px] leading-none pt-[3px]">Delivery available!</p>
                  )}
                </div>
              </div>

              {/* Flavor Selection */}
              <div className="w-fit flex max-[450px]:flex-row flex-col items-center max-[450px]:mt-2">
                <span className="text-[15px] sm:text-[16px] md:text-[17px] xl:text-[18px] 2xl:text-[19px] font-medium orange-text">Flavor</span>
                <p className="orange-bg text-white px-5 max-[450px]:py-[3.5px] py-[4.5px] text-center rounded-sm whitespace-nowrap max-[450px]:ml-2 max-[450px]:mt-0 mt-2 text-[14.5px] sm:text-[15px] md:text-[16px]  border-white border-1">
                  {item.flavor}
                </p>
              </div>
            </div>

            {/* Time & Date Selection */}
            <div>
              {/* Headings Row (for lg screens and above) */}
              <div className="hidden mt-[6px] min-[451px]:flex min-[451px]:flex-row min-[451px]:gap-4">
                <h2 className="leading-none text-[14.5px] sm:text-[15px] md:text-[16px] xl:text-[17px] 2xl:text-[18px] font-medium orange-text">Select Delivery Time</h2>
                <h2 className="leading-none text-[14.5px] sm:text-[15px] md:text-[16px] xl:text-[17px] 2xl:text-[18px] font-medium orange-text">Select Delivery Date</h2>
              </div>

              {/* Inputs Row (for lg screens and above) */}
              <div className="hidden min-[451px]:flex min-[451px]:flex-row min-[451px]:gap-2 min-[451px]:mt-2">
                {/* Time Slot Selection */}
                <div className="flex flex-col gap-1">
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="border h-8 px-1 rounded-sm w-full min-[451px]:w-[200px] text-[14px] sm:text-[15px] md:text-[16px] xl:text-[17px] 2xl:text-[18px] green-text "
                    required
                  >
                    <option value="">Select Time Slot</option>
                    <option value="09 AM - 12 PM">09:00 AM - 12:00 PM</option>
                    <option value="12 PM - 03 PM">12:00 PM - 3:00 PM</option>
                    <option value="03 PM - 06 PM">03:00 PM - 06:00 PM</option>
                    <option value="06 PM - 09 PM">06:00 PM - 09:00 PM</option>
                  </select>
                  {/* Error Message for Time Slot */}
                  {!isFormValid && !selectedTimeSlot && (
                    <p className="leading-none text-red-500 text-[13px] md:text-[14px]">Select Valid Time</p>
                  )}
                </div>

                {/* Date Selection */}
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border h-8  px-1 rounded-sm w-full min-[451px]:w-[200px] text-[14px] sm:text-[15px] md:text-[16px] xl:text-[17px] 2xl:text-[18px] green-text "
                  min={new Date().toISOString().split("T")[0]} // Disable past dates
                  required
                />
              </div>

              {/* Grouped Layout (for screens smaller than lg) */}
              <div className="min-[451px]:hidden">
                {/* Time Selection Group */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-sm font-medium orange-text">Select Delivery Time:</h2>
                  <div className="flex flex-col gap-1">
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="border h-8 px-1 rounded-sm w-full text-[14px] green-text"
                      required
                    >
                      <option value="">Select Time Slot</option>
                      <option value="09 AM - 12 PM">09:00 AM - 12:00 PM</option>
                      <option value="12 PM - 03 PM">12:00 PM - 03:00 PM</option>
                      <option value="03 PM - 06 PM">03:00 PM - 06:00 PM</option>
                      <option value="06 PM - 09 PM">06:00 PM - 09:00 PM</option>
                    </select>
                    {/* Error Message for Time Slot */}
                    {!isFormValid && !selectedTimeSlot && (
                      <p className="leading-none text-red-500 text-[12px]">Select Valid Time</p>
                    )}
                  </div>
                </div>

                {/* Date Selection Group */}
                <div className="flex flex-col gap-2 mt-[6px]">
                  <h2 className="text-sm font-medium orange-text">Select Delivery Date:</h2>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border h-8  px-1 rounded-sm w-full text-[14px] green-text"
                    min={new Date().toISOString().split("T")[0]} // Disable past dates
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description & Ingredients */}
            <div className="mt-[6px]">
              <h2 className="leading-none mb-[3px] text-[15px] sm:text-[16px] md:text-[17px] xl:text-[18px] 2xl:text-[19px] font-medium orange-text">
                Description
              </h2>
              <p className="text-[14.5px] sm:text-[15px] md:text-[16px] xl:text-[18px] font-normal text-justify green-text ">{item.cakeD}</p>
            </div>
            <div>
              <h2 className="text-[15px] sm:text-[16px] md:text-[17px] xl:text-[18px] 2xl:text-[19px] font-medium orange-text">
                Ingredients
              </h2>
              <p className="text-[14.5px] sm:text-[15px] md:text-[16px] xl:text-[18px] font-normal text-justify green-text ">{item.ingredient}</p>
            </div>

            {/* Message on Cake */}
            <div>
              <h2 className="text-[15px] sm:text-[16px] md:text-[17px] xl:text-[18px] 2xl:text-[19px] font-medium orange-text">
                Message on Cake (Optional)
              </h2>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-1 gap-2">
                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Enter a message (Max 25 characters)"
                  maxLength={25}
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  className="border border-black h-[31px] md:h-[32px] px-2 font-normal rounded-sm w-full sm:w-[380px]"
                />

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full max-[450px]:mt-[6px] sm:w-fit h-fit px-5 py-[5px] orange-bg text-white border-white border-1 font-medium rounded-sm flex items-center justify-center text-[14.5px] sm:text-[15.5px] md:text-[16.5px]"
                >
                  Add to Cart <ChevronRight className="animate-move size-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDetails;

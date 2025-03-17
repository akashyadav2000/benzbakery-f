import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { productDetailsActions } from "../Store/productDetailsSlice";

const WeddingCake = ({ weddingCakeItem }) => {
  const dispatch = useDispatch();

  const handleAddProductDetails = () => {
    dispatch(productDetailsActions.addToProductDetails(weddingCakeItem.id));
  };

  return (
    <Link
      to="/ProductDetails"
      onClick={handleAddProductDetails}
      id={weddingCakeItem.id}
      className="w-full h-auto flex flex-col items-center justify-center rounded-lg overflow-hidden pink-shadow"
    >
      {/* Image Container */}
      <div className="w-full overflow-hidden">
        <img
          src={weddingCakeItem.image}
          alt={weddingCakeItem.alt_Name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Price and Item Name */}
      <span className="w-full price-div-bg transition-all duration-100 ease-out font-medium tracking-[0.045rem] text-[13px] sm:text-[15px] md:text-[17px] xl:text-[18px] 2xl:text-[19px] text-black hover:text-[#cf661a] text-center  max-[450px]:text-[13px] leading-tight pt-1 pb-[5px] mb-[-1px]">
        {weddingCakeItem.item}
        <br />₹ {weddingCakeItem.defaultPrice}
      </span>
    </Link>
  );
};

export default WeddingCake;

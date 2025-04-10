import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { productDetailsActions } from "../Store/productDetailsSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CupCake = ({ cupCakeItem }) => {
  const dispatch = useDispatch();

  const handleAddProductDetails = () => {
    dispatch(productDetailsActions.addToProductDetails(cupCakeItem.id));
  };

  return (
    <Link
      to="/ProductDetails"
      onClick={handleAddProductDetails}
      id={cupCakeItem.id}
      className="w-full h-auto flex flex-col items-center justify-center rounded-lg overflow-hidden pink-shadow"
    >
      {/* Image Container */}
      <div className="w-full aspect-square overflow-hidden">
        <LazyLoadImage
          src={cupCakeItem.image}
          alt={cupCakeItem.alt_Name}
          // effect="blur"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Price and Item Name */}
      <span className="w-full price-div-bg transition-all duration-100 ease-out font-medium tracking-[0.045rem] text-[13px] sm:text-[15px] md:text-[17px] xl:text-[18px] 2xl:text-[19px] text-black hover:text-[#cf661a] text-center  max-[450px]:text-[13px] leading-tight py-1 ">
        {cupCakeItem.item}
        <br />₹ {cupCakeItem.defaultPrice}
      </span>
    </Link>
  );
};

export default CupCake;

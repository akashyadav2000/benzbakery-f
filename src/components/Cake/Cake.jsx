import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { productDetailsActions } from "../Store/productDetailsSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Cake = ({ cakeItem }) => {
  const dispatch = useDispatch();

  const handleAddProductDetails = () => {
    dispatch(productDetailsActions.addToProductDetails(cakeItem.id));
  };

  return (
    <Link
      to="/ProductDetails"
      onClick={handleAddProductDetails}
      id={cakeItem.id}
      className="w-full h-auto flex flex-col items-center justify-center rounded-lg overflow-hidden pink-shadow"
    >
      {/* Image Container */}
      <div className="w-full aspect-square overflow-hidden">
        <LazyLoadImage
          src={cakeItem.image}
          alt={cakeItem.alt_Name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Price and Item Name */}
      <span className="w-full price-div-bg transition-all duration-100 ease-out font-medium tracking-[0.045rem] text-[13px] sm:text-[15px] md:text-[17px] xl:text-[18px] 2xl:text-[19px] text-black hover:text-[#cf661a] text-center  max-[450px]:text-[13px] leading-tight py-1 ">
        {cakeItem.item}
        <br />₹ {cakeItem.defaultPrice}
      </span>
    </Link>
  );
};

export default Cake;

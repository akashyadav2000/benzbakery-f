import React from "react";
import { useSelector } from "react-redux";
import WeddingCake from "./WeddingCake";

const WeddingCakeContainer = () => {
  const items = useSelector((store) => store.weddingCakeItems);

  return (
    <div
      className="weddingcake-background-color min-h-fit flex-col justify-center items-center overflow-hidden w-full max-w-[100vw] py-[6px]"
    >
      <h1 className="text-center text-[21.5px] sm:text-[23px] md:text-[24px] lg:text-[26px] xl:text-[29px] pt-3 pb-[2px] md:pt-5 md:pb-3 text-[#ff0080ad] great-vibes tracking-wide">
        Our Most Popular
        <span className="pl-3 text-black tracking-widest">WeddingCake</span>
      </h1>
      <div
        className="grid max-[500px]:grid-cols-2 grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-8 sm:gap-y-11
         sm:gap-x-12 lg:gap-y-14 lg:gap-x-15 px-[6%] sm:px-[7%] xl:px-[12%] 2xl:px-[14%] pt-3 pb-10 
         max-[450px]:gap-x-7 max-[450px]:gap-y-6 max-[450px]:px-[6%] w-full max-w-[100vw]"
      >
        {items.map((weddingCakeElement) => (
          <WeddingCake
            key={weddingCakeElement.id}
            weddingCakeItem={weddingCakeElement}
          />
        ))}
      </div>
    </div>
  );
};

export default WeddingCakeContainer;

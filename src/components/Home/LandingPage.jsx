import { ChevronRight } from "lucide-react";
import React from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link as ScrollLink } from "react-scroll";

function LandingPage() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden poppins">
      {/* Background Image */}
      <picture>
        <source srcSet="/Home-Background.webp" type="image/webp" />
        <img
          src="/Home-Background.jpg" // fallback if browser doesn't support WebP
          alt="Background"
          loading="eager"
          decoding="async"
          className="absolute pt-[50px] sm:pt-14 inset-0 w-full h-full object-cover"
        />
      </picture>


      {/* Content */}
      <div className="relative z-10 mt-6 text-white text-center w-xl sm:w-xl md:w-2xl lg:w-3xl xl:w-4xl max-[450px]:px-3 px-6 lg:px-10">
        <h1 className="max-[450px]:text-[34px] text-[37px] sm:text-[40px] md:text-[48px] lg:text-[52px] xl:text-[55px] 2xl:text-[58px] tracking-[0.1rem] font-semibold drop-shadow-lg orange-text-shadow leading-10">
          Every Flavor Has A Story
        </h1>
        <p className="mt-[5px] sm:mt-[8px] xl:[10px] max-[450px]:text-[17px] text-[19px] sm:text-[21px] md:text-[22px] lg:text-[23px] xl:text-[24px] 2xl:text-[26px] max-[450px]:px-5 px-8 sm:px-10 xl:px-18 2xl:px-12 drop-shadow-md orange-text-shadow">
          Blending Tradition with Innovation, My Passion for the Art of Baking
        </p>

        {/* Button Centered Properly */}
        <ScrollLink
          to="cake" // Scroll to the Cake section
          smooth={true} // Enable smooth scrolling
          duration={500} // Duration of the scroll animation
          offset={-56} // Offset to account for the header height
          className="mt-[12px] md:mt-[15px] px-[11px] py-[5px] sm:px-[12px] md:py-[5.5px] xl:px-[14px] ordernow-btn font-medium rounded-md shadow-md transition flex items-center mx-auto text-[16px] sm:text-[17px] md:text-[18px] xl:text-[19px] text-center roboto-serif group cursor-pointer w-fit">
          <span>Order Now</span>
          <ChevronRight className="text-white h-5 w-5 xl:h-6 xl:w-6 animate-move group-hover:text-[#002a1b]" />
        </ScrollLink>
      </div>
    </section>
  );
}

export default LandingPage;

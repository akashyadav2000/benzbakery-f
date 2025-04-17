import React, { lazy, Suspense } from 'react';

// Lazy load non-critical components
const ChevronRight = lazy(() => import("lucide-react").then(m => ({ default: m.ChevronRight })));
const ScrollLink = lazy(() => import("react-scroll").then(m => ({ default: m.Link })));

function LandingPage() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden poppins">
      {/* Optimized Image Loading */}
      <picture>
        <source
          srcSet="/Home-Background.avif 1920w, /Home-Background-800px.avif 800w"
          type="image/avif"
          sizes="100vw"
        />
        <source
          srcSet="/Home-Background.webp 1920w, /Home-Background-800px.webp 800w"
          type="image/webp"
          sizes="100vw"
        />
        <img
          src="/Home-Background.jpg"
          alt="Artisan bakery with fresh pastries"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
          className="absolute pt-[50px] sm:pt-14 inset-0 w-full h-full object-cover"
        />
      </picture>

      {/* Content */}
      <div className="relative z-10 mt-6 text-white text-center w-xl sm:w-xl md:w-2xl lg:w-3xl xl:w-4xl max-[450px]:px-3 px-6 lg:px-10">
        <h1 className="max-[450px]:text-[34px] text-[37px] sm:text-[40px] md:text-[48px] lg:text-[52px] xl:text-[55px] 2xl:text-[58px] tracking-[0.1rem] font-semibold drop-shadow-lg orange-text-shadow leading-10">
          Every Flavor Has A Story
        </h1>

        <Suspense fallback={<div className="h-6" />}>
          <ScrollLink
            to="cake"
            smooth={true}
            duration={500}
            offset={-56}
            className="mt-[12px] md:mt-[15px] px-[11px] py-[5px] sm:px-[12px] md:py-[5.5px] xl:px-[14px] ordernow-btn font-medium rounded-md shadow-md transition flex items-center mx-auto text-[16px] sm:text-[17px] md:text-[18px] xl:text-[19px] text-center roboto-serif group cursor-pointer w-fit">
            <span>Order Now</span>
            <ChevronRight className="text-white h-5 w-5 xl:h-6 xl:w-6 animate-move group-hover:text-[#002a1b]" />
          </ScrollLink>
        </Suspense>
      </div>
    </section>
  );
}

export default LandingPage;
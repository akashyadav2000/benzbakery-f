import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function About() {
  return (
    <>
      {/* About Section */}
      <div
        className="poppins flexible-height sm:h-screen w-full mt-[50px] sm:mt-14 bg-cover bg-left"
        style={{
          backgroundImage: 'url("/about-background.jpg")',
        }}
      >
        <div className=" absolute bottom-[3%] md:bottom-[5%] xl:bottom-[7%] left-1/2 w-[95%] lg:w-[90%] xl:w-[85%] 2xl:w-[75%] transform -translate-x-1/2  bg-white/75  rounded-lg px-3 sm:px-6 md:px-7 lg:px-9 2xl:px-12 py-1">
          <p className=" text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[22px] brown-color text-justify my-2 lg:my-2 2xl:my-3">
            Our story begins with a love of cooking and a desire to share that
            love with our community. Today Benz Bakery is a symbol of integrity.
          </p>
          <p className=" text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[22px] brown-color text-justify my-2 lg:my-2 2xl:my-3">
            Step into our world of flour, sugar, and everything nice. At Benz
            Bakery, we believe in the magic of freshly baked goods and the joy
            they bring.
          </p>
          <p className=" text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[22px] brown-color text-justify my-2 lg:my-2 2xl:my-3">
            At Benz Bakery, baking isn't just a job, it's our passion. Every
            dessert is a testament to our commitment to quality and taste.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <section className="about-bg roboto-serif my-8 sm:my-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-pink-600 text-center pt-4">
          Our Value
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center items-center gap-8 px-12 xl:px-23 pt-7 pb-7">
          {/* <div className="flex flex-wrap justify-evenly items-center gap-8 px-12 xl:px-18 pt-7 pb-7 "> */}

          {/* Value Card 1 */}
          <div className="flex flex-col items-center text-center w-48 md:w-56 xl:w-64">
            <LazyLoadImage
              src="./Recipes.png"
              alt="Recipes"
              // effect="blur"
              className="h-12 sm:h-16 w-auto"
            />
            <h2 className="text-[14px] base:text-[15px] md:text-[16px]  xl:text-[18px] 2xl:text-[19px] font-semibold text-blue-600 mt-4">
              AUTHENTIC RECIPES
            </h2>
            <p className="text-[14px] base:text-[15px] md:text-[16px]  xl:text-[18px] 2xl:text-[19px] font-medium text-black mt-2">
              Baked with traditional recipes, fresh ingredients, no
              preservatives, and no chemicals.
            </p>
          </div>

          {/* Value Card 2 */}
          <div className="flex flex-col items-center text-center w-48 md:w-56 xl:w-64">
            <LazyLoadImage
              src="./love.png"
              alt="Baked with Love"
              // effect="blur"
              className="h-12 sm:h-16 w-auto"
            />
            <h2 className="text-[14px] base:text-[15px] md:text-[16px]  xl:text-[18px] 2xl:text-[19px] font-semibold text-blue-600 mt-4">
              BAKED WITH LOVE
            </h2>
            <p className="text-[14px] base:text-[15px] md:text-[16px]  xl:text-[18px] 2xl:text-[19px] font-medium text-black mt-2">
              Our passion for baking is poured into every recipe, serving smiles
              on a plate every day.
            </p>
          </div>

          {/* Value Card 3 */}
          <div className="flex flex-col items-center text-center w-48 md:w-56 xl:w-64">
            <LazyLoadImage
              src="./Price.png"
              alt="Best Price"
              // effect="blur"
              className="h-12 sm:h-16 w-auto"
            />
            <h2 className="text-[14px] base:text-[15px] md:text-[16px]  xl:text-[18px] 2xl:text-[19px] font-semibold text-blue-600 mt-4">
              HONESTLY PRICED
            </h2>
            <p className="text-[14px] base:text-[15px] md:text-[16px]  xl:text-[18px] 2xl:text-[19px] font-medium text-black mt-2">
              We constantly offer the best products at the right prices because
              we believe in honest pricing.
            </p>
          </div>

          {/* Value Card 4 */}
          <div className="flex flex-col items-center text-center w-48 md:w-56 xl:w-64">
            <LazyLoadImage
              src="./Quality.png"
              alt="Quality Products"
              // effect="blur"
              className="h-12 sm:h-16 w-auto"
            />
            <h2 className="text-[14px] base:text-[15px] md:text-[16px]  xl:text-[18px] 2xl:text-[19px] font-semibold text-blue-600 mt-4">
              BEST IN QUALITY
            </h2>
            <p className="text-[14px] base:text-[15px] md:text-[16px]  xl:text-[18px] 2xl:text-[19px] font-medium text-black mt-2">
              From our ingredients to our kitchen operations & services, we
              always prioritize quality.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

import React, { useEffect } from "react";
import LandingPage from "./LandingPage";
import CakeContainer from "../Cake/CakeContainer";
import PastryContainer from "../Pastry/PastryContainer";
import CupCakeContainer from "../CupCake/CupCakeContainer";
import WeddingCakeContainer from "../WeddingCake/WeddingCakeContainer";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      setTimeout(() => {
        const sectionElement = document.getElementById(location.state.scrollTo);
        if (sectionElement) {
          // Adjust for the fixed header height (56px)
          const offset = 56;
          const elementPosition = sectionElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // Scroll to the top if no section is specified
      window.scrollTo(0, 0);
    }
  }, [location.state, location.pathname]);

  return (
    <>
      <section id="home">
        <LandingPage />
      </section>
      <section id="cake">
        <CakeContainer />
      </section>
      <section id="pastry">
        <PastryContainer />
      </section>
      <section id="cupCake">
        <CupCakeContainer />
      </section>
      <section id="weddingCake">
        <WeddingCakeContainer />
      </section>
    </>
  );
}

export default Home;

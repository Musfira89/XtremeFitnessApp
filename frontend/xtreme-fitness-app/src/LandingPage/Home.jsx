import React from "react";
import Header from "./Header/Header";
import Card from "./Product/ProductSection";
import Footer from "./Footer/Footer";

import Video from "./Blog/Video";
import ReviewSection from "./Blog/ReviewSection";
import FaqSection from "./Blog/Faq";
import About from "./Blog/About";
import Services from "./Blog/Services";
import PricingPlans from "./Pricing/PricingPlan";
import Contactform from "./Blog/Contactform";
import Support from "./Blog/Support";
import Newsbar from "./Header/Newbar";
export const Home = () => {
  return (
    <>
      <Newsbar />
      <Header />

      <Card />
      <About />
      <Services />

      <PricingPlans />
      <FaqSection />
      <ReviewSection />
      <Support />
      <Contactform />
      <Footer />
    </>
  );
};

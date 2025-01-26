import React from "react";
import Header from "./Header/Header";
import Card from "./Product/Card";
import Footer from "./Footer/Footer";

import BenefitsSection from "./Header/BenefitsSection";
import Coach from "./Blog/Coach";
import Video from "./Blog/Video";
import ReviewSection from "./Blog/ReviewSection";
import FaqSection from "./Blog/Faq";
import About from "./Blog/About";
import PricingPlans from "./Pricing/PricingPlan";
import Contactform from "./Blog/Contactform";
import WorkoutSection from "./Blog/WorkoutSection ";
export const Home = () => {
  return (
    <>
      <Header />
      <BenefitsSection />
      <Card />
      <About/>
      <Video/>
      <WorkoutSection/>
      <Coach/>
      <PricingPlans/>
      <FaqSection/>
      <ReviewSection/>
      <Contactform/>
      <Footer />
    </>
  );
};

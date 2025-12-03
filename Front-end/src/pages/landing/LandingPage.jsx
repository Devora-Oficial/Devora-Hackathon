import React from "react";

import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import FeatureStrip from "../../components/landing/FeatureStrip";
import Panels from "../../components/landing/Panels";
import Automation from "../../components/landing/Automation";
import MobileShowcase from "../../components/landing/MobileShowcase";
import Team from "../../components/landing/Team";
import Integrations from "../../components/landing/Integrations";
import Pricing from "../../components/landing/Pricing";
import Testimonials from "../../components/landing/Testimonials";
import FinalCTA from "../../components/landing/FinalCTA";
import Footer from "../../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-[#07060a] text-white font-sans antialiased">
      <Navbar />
      <main className="pt-24">
        <Hero />
        <FeatureStrip />
        <Panels />
        <Automation />
        <MobileShowcase />
        <Team />
        <Integrations />
        <Pricing />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

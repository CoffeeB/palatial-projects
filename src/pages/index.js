import About from "@/components/main/About";
import ChooseUs from "@/components/main/ChooseUs";
import HeroSection from "@/components/main/HeroSection";
import Nav from "@/components/main/Nav";
import Services from "@/components/main/Services";
import SlidingSection from "@/components/main/SlidingSection";
import React from "react";

export default function landingPage() {
  return (
    <>
      <Nav />
      <HeroSection />
      <SlidingSection />
      <About />
      <Services />
      <ChooseUs />
    </>
  );
}

import About from "@/components/main/About";
import ChooseUs from "@/components/main/ChooseUs";
import Contact from "@/components/main/Contact";
import Footer from "@/components/main/Footer";
import HeroSection from "@/components/main/HeroSection";
import Layout from "@/components/main/Layout";
import Nav from "@/components/main/Nav";
import Portfolio from "@/components/main/Portfolio";
import Services from "@/components/main/Services";
import SlidingSection from "@/components/main/SlidingSection";
import Testimonials from "@/components/main/Testimonials";
import React from "react";

export default function landingPage() {
  return (
    <Layout>
      <Nav />
      <HeroSection />
      <SlidingSection />
      <About />
      <Services />
      <ChooseUs />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </Layout>
  );
}

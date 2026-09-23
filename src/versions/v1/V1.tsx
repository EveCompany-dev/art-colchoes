"use client";

import Smooth from "@/components/Smooth";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Footer } from "@/components/Contact";
import Hero from "./Hero";
import TechLayers from "./TechLayers";
import { About, Ambientes, BrandMarquee, Categories, ContactSection, Differentials, FaqSection, Guide, Products } from "./Sections";

export default function V1() {
  return (
    <>
      <Header heroTone="dark" barTone="light" accent="#0b1630" />
      <Smooth>
        <main>
          <Hero />
          <BrandMarquee />
          <Differentials />
          <TechLayers />
          <Categories />
          <Products />
          <Guide />
          <Ambientes />
          <About />
          <FaqSection />
          <ContactSection />
        </main>
        <Footer theme="dark" />
      </Smooth>
      <WhatsAppFloat />
    </>
  );
}

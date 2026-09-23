"use client";

import Smooth from "@/components/Smooth";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Footer } from "@/components/Contact";
import Hero from "./Hero";
import Anatomy from "./Anatomy";
import { BigList, FaqInsta, FinalCta, Guide, Manifesto, Products, Region, ScrollMarquee, Showroom } from "./Sections";

export default function V3() {
  return (
    <div className="bg-[#ebe4d8] font-[family-name:var(--font-grotesk)]">
      <Header heroTone="dark" barTone="light" accent="#1f4fff" />
      <Smooth smooth={1}>
        <main>
          <Hero />
          <ScrollMarquee />
          <Manifesto />
          <BigList />
          <Anatomy />
          <Products />
          <Showroom />
          <Guide />
          <Region />
          <FaqInsta />
          <FinalCta />
        </main>
        <Footer theme="dark" />
      </Smooth>
      <WhatsAppFloat />
    </div>
  );
}

"use client";

import Smooth from "@/components/Smooth";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Footer } from "@/components/Contact";
import Hero from "./Hero";
import Peel from "./Peel";
import { About, BrandWall, FaqContact, Guide, ProductRail, ShowroomReveal, SpringCompare, StackCards } from "./Sections";

export default function V2() {
  return (
    <div className="bg-[#070d1f]">
      <Header heroTone="light" barTone="dark" accent="#2f6bff" />
      <Smooth smooth={1.4}>
        <main>
          <Hero />
          <StackCards />
          <Peel />
          <SpringCompare />
          <ProductRail />
          <ShowroomReveal />
          <BrandWall />
          <Guide />
          <About />
          <FaqContact />
        </main>
        <Footer theme="dark" />
      </Smooth>
      <WhatsAppFloat />
    </div>
  );
}

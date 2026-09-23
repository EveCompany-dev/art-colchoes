"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip, DrawSVGPlugin, useGSAP);

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip, useGSAP };

if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  Object.assign(window, { gsap, ScrollTrigger, ScrollSmoother });
}

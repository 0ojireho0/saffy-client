"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";


import heroImg from "@/assets/images/hero-img.png"


import Partnership from "@/app/(client)/Partnership";
import FeaturedProducts from "./FeaturedProducts";
import Founder from "./Founder";
import Philosophy from "./Philosophy";
import FeaturedStories from "./FeaturedStories"




export default function Home() {







  return (
    <>
      {/* Page fade-in */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>

        <section className="relative w-full overflow-hidden h-[640px] sm:h-[720px] md:h-[820px] lg:h-[900px]">
          {/* Background Image */}
          <Image
            src={heroImg}
            alt="Saffy Inc. building"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Dark green overlay like the design */}
          <div className="absolute inset-0 bg-linear-to-b from-[#0B2B26]/10 to-[#07231F]/90" />

          {/* Content */}
          <div className="relative h-full flex items-end justify-center">
            {/* Bottom spacing matches the design feel */}
            <div className="w-full px-4 sm:px-8 pb-14 sm:pb-16 md:pb-20 lg:pb-14 text-center">
              <h1 className="sailec-bold text-white text-[44px] sm:text-[56px] md:text-[72px] lg:text-[120px] leading-[0.95]">
                Saffy Inc.
              </h1>

              <p className="mt-5 sm:mt-6 sailec-regular text-white/90 uppercase tracking-[0.12em] text-[14px] sm:text-[16px] md:text-[25px] leading-snug">
                EMPOWERING FILIPINO ARTISANS <br className="hidden sm:block" />
                TOWARD DEVELOPMENT
              </p>

              <button className="mt-7 sm:mt-8 text-[#05251F] sailec-medium bg-[#E4E9A7] pt-3 pb-1.5 px-[16px] text-center rounded-full">
                VIEW PRODUCTS
              </button>
            </div>
          </div>
        </section>


        {/* Philosophy */}
        <Philosophy />


        {/* Our Founder */}
        <Founder />


        {/* Featured Products */}
        <FeaturedProducts />

        {/* 3 Images with hover animation */}
        <FeaturedStories />

        {/* In Partnership with */}
        <Partnership />

      </motion.div>
    </>
  );
}

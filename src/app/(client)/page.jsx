"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import heroImg from "@/assets/images/hero-img.jpg"


import Partnership from "@/app/(client)/Partnership";
import FeaturedProducts from "./FeaturedProducts";
import Founder from "./Founder";
import Philosophy from "./Philosophy";

import img1Hover from "@/assets/images/img1_hover.jpg"
import img2Hover from "@/assets/images/img2_hover.jpg"
import img3Hover from "@/assets/images/about/how-we-make-difference.png"


export default function Home() {
  const items = [
    {
      id: 1,
      title: "Stories from\nthe Studio",
      author: "Jane Doe",
      img: img1Hover,
    },
    {
      id: 2,
      title: "Handmade Ceramics",
      author: "Studio Notes",
      img: img2Hover,
    },
    {
      id: 3,
      title: "Woven Baskets",
      author: "Craft Archive",
      img: img3Hover,
    },
  ];



  // Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };



  const sectionFade = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

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
          <div className="absolute inset-0 bg-linear-to-b from-[#0B2B26]/10 to-[#0B2B26]/80" />

          {/* Content */}
          <div className="relative h-full flex items-end justify-center">
            {/* Bottom spacing matches the design feel */}
            <div className="w-full px-4 sm:px-8 pb-14 sm:pb-16 md:pb-20 lg:pb-24 text-center">
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
        <motion.section
          className="w-full"
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="grid grid-cols-1 xl:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {items.map((item) => (
              <motion.article
                key={item.id}
                variants={fadeUp}
                className="group relative isolate overflow-hidden bg-slate-950 cursor-pointer min-h-[420px] h-[65vh] sm:h-[60vh] lg:h-[70vh] xl:h-[85vh]"
              >
                <Image
                  src={item.img}
                  alt={item.title.replace("\n", " ")}
                  fill
                  priority={item.id === 1}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/10 to-[#06332B] opacity-70 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100" />

                <div className="absolute inset-x-4 bottom-4 z-20 text-white transition-all duration-300 ease-out sm:inset-x-6 sm:bottom-6 lg:inset-x-8 lg:bottom-8 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 sailec-medium">
                  <h3 className="whitespace-pre-line leading-[0.95] tracking-tight text-[32px] sm:text-[42px] md:text-[52px] lg:text-[64px] xl:text-[76px] 2xl:text-[88px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 sm:text-base md:text-lg lg:text-[22px] xl:text-[26px]">
                    {item.author}
                  </p>
                </div>

                <span className="absolute inset-0 z-30 ring-0 ring-white/40 transition focus-within:ring-2" />
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center justify-center px-6 py-12 sm:py-16 lg:py-20"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <button
              type="button"
              className="rounded-full bg-[#0B2B26] px-5 py-3 text-[14px] text-[#E1F1D5] transition-transform hover:scale-105 sm:px-6 sm:text-[16px] sailec-medium"
            >
              MORE NEWS & STORIES
            </button>
          </motion.div>
        </motion.section>

        {/* In Partnership with */}
        <Partnership />

      </motion.div>
    </>
  );
}

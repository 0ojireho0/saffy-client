"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import heroImg from "@/assets/images/hero-img.jpg"


import Partnership from "@/app/(client)/Partnership";
import FeaturedProducts from "./FeaturedProducts";
import Founder from "./Founder";
import Philosophy from "./Philosophy";

export default function Home() {
  const items = [
    {
      id: 1,
      title: "Stories from\nthe Studio",
      author: "Jane Doe",
      img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 2,
      title: "Handmade Ceramics",
      author: "Studio Notes",
      img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 3,
      title: "Woven Baskets",
      author: "Craft Archive",
      img: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1400&q=80",
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

              <button className="mt-7 sm:mt-8 text-[#05251F] sailec-medium bg-[#E4E9A7] pt-3 pb-1.5 px-6 rounded-full">
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
          className="min-h-screen"
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 min-h-screen"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {items.map((item) => (
              <motion.article
                key={item.id}
                variants={fadeUp}
                className="group relative isolate overflow-hidden bg-slate-950 cursor-pointer h-[60vh] sm:h-[70vh] lg:h-screen"
              >
                <Image
                  src={item.img}
                  alt={item.title.replace("\n", " ")}
                  fill
                  priority={item.id === 1}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 z-10 bg-linear-to-b from-black/10 to-[#06332B] transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

                <div className="absolute inset-x-4 bottom-4 z-20 text-white transition-all duration-300 ease-out opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 sailec-medium">
                  <h3 className="whitespace-pre-line text-4xl leading-tight tracking-tight md:text-[88px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 md:text-[26px]">{item.author}</p>
                </div>

                <span className="absolute inset-0 z-30 rounded-2xl ring-0 ring-white/40 transition focus-within:ring-2" />
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="py-20 flex justify-center items-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <h1 className="text-[#E1F1D5] bg-[#0B2B26] pt-3 pb-1.5 px-5 rounded-full sailec-medium text-[16px] cursor-pointer hover:scale-110 transition-transform">
              MORE NEWS & STORIES
            </h1>
          </motion.div>
        </motion.section>

        {/* In Partnership with */}
        <Partnership />

      </motion.div>
    </>
  );
}

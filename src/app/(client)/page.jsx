"use client"
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

// Images
import wftoAsia from "@/assets/images/wfto-asia.png"
import wfto from "@/assets/images/wfto.png"
import philexport from "@/assets/images/philexport.png"
import ccap from "@/assets/images/ccap.png"

import img1 from "@/assets/images/featured-products/img1.jpg"
import img2 from "@/assets/images/featured-products/img2.jpg"
import img3 from "@/assets/images/featured-products/img3.jpg"
import img4 from "@/assets/images/featured-products/img4.jpg"
import img5 from "@/assets/images/featured-products/img5.jpg"

import founder from "@/assets/images/sister-juliaan.png"
import philosphy from "@/assets/images/philosophy-homepage.jpg"



import Header from "@/components/Header"
import Subheader from "@/components/Subheader";

export default function Home() {

  // For 3 images
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

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  const featuredProductsList = [
    {
      id: 1,
      title: "Basket Tray 2",
      desc: "Oblong cogon basket tray with small handles",
      img: img5
    },
    {
      id: 2,
      title: "Hanging Decor",
      desc: "Capiz and brass mother-and-child decor",
      img: img3
    },
    {
      id: 3,
      title: "Hanging Ornament",
      desc: "Starlink Bird Jose hanging ornament and capiz brass",
      img: img1
    },
    {
      id: 4,
      title: "Basket",
      desc: "Mini bayong woven from natural rattan",
      img: img4
    },
    {
      id: 5,
      title: "Mortar and Pestle",
      desc: "Acacia wood mortar and pestle with a tarpered round design",
      img: img2
    },
  ]


  return (
    <>


    {/* Philosophy */}
    <section>

    </section>

    {/* Our Founder */}
    <section className="w-full bg-linear-to-b from-[#215348] to-[#092723] pt-[90.5px] pb-[120.5px] px-4 lg:px-70 xl:px-95.25">
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:gap-20">
        <div className="py-[107.5] ">
          <div className="lg:w-[580]">
            <h1 className="text-[#E4E9A7] helvetica-bold text-[32px]">OUR FOUNDER</h1>
            <h1 className="mt-[24] sailec-regular text-[20px] text-white  text-justify">From the belief of Sister Julian Mullie, ICM, a Belgian missionary nun, that one can "Fight Hunger Through Work", SAFFY or Social Action for Filipino Youth saw the light of day in 1966. This organization created alternative sources of livelihood for the unemployed and out-of-school youths living in the marginalized areas of Manila.</h1>
            <h1 className="mt-[24] sailec-regular text-[20px] text-white text-justify">The organization was later incorporated in 1970 as Social Action Foundation for Rural and Urban Development, Inc. or SAFRUDI, a non-stock, non-profit social development entity imbued with Christian values</h1>
          </div>
          <button 
            className="mt-[24] text-[#05251F] sailec-medium bg-[#E4E9A7] pt-[12] pb-[6] px-[20] rounded-full"
          >LEARN MORE</button>
        </div>
        <div className="lg:w-[500]">
          <Image 
            src={founder}
            alt="founder"
          />
        </div>
      </div>
    </section>


    {/* Featured Products */}
    <section className="w-full min-h-225.25 bg-[#E1F1D5]">
      {/* Header */}
      <div className="pt-12 md:pt-16 lg:pt-20 text-center px-4 md:px-10 lg:px-0">
        <h1 className="helvetica-bold text-[24px] md:text-[28px] lg:text-[32px]">
          FEATURED PRODUCTS
        </h1>
        <h1 className="mt-3 sailec-regular text-[#52726E] text-[18px] md:text-[22px] lg:text-[28px]">
          Discover products that reflects our purpose
        </h1>
      </div>

      {/* Grid */}
      <div className="mt-10 md:mt-12 lg:mt-15 flex justify-center items-center px-4 md:px-10 lg:px-34.5">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8 md:gap-6 lg:gap-9 relative w-full">
          {featuredProductsList.map((item, i) => {
            return (
              <div key={i} className="flex flex-col items-center md:items-start">
                {/* Image wrapper */}
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[20px]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 300px"
                  />
                </div>

                <h1 className="mt-4 md:mt-5 lg:mt-6 sailec-bold text-[22px] md:text-[24px] lg:text-[28px] text-[#0B2A26] text-center md:text-left">
                  {item.title}
                </h1>
                <h1 className="mt-1.5 sailec-regular text-[14px] md:text-[16px] lg:text-[18px] text-[#52726E] text-center md:text-left">
                  {item.desc}
                </h1>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button */}
      <div className="py-15 text-center px-4">
        <button className="text-[#E1F1D5] bg-[#0B2B26] pt-3 pb-1.5 px-5 rounded-full sailec-medium text-[16px] cursor-pointer hover:scale-110 transition-transform">
          VIEW MORE PRODUCTS
        </button>
      </div>
    </section>


    {/* 3 Images with hover animation */}
    <section className="min-h-screen">
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
            className="
              group relative isolate overflow-hidden bg-slate-950
              cursor-pointer h-[70vh] lg:h-screen
            "
          >
            {/* Image */}
            <Image
              src={item.img}
              alt={item.title.replace("\n", " ")}
              fill
              priority={item.id === 1}
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="
                object-cover
                transition-transform duration-500 ease-out
                group-hover:scale-110
              "
            />

            {/* Gradient overlay */}
            <div
              className="
                absolute inset-0 z-10
                bg-linear-to-b from-black/10 to-[#06332B]
                transition-opacity duration-300
                opacity-0
                group-hover:opacity-100
              "
            />

            {/* Text */}
            <div
              className="
                absolute inset-x-4 bottom-4 z-20 text-white
                transition-all duration-300 ease-out
                opacity-100 translate-y-0

                lg:opacity-0 lg:translate-y-3
                lg:group-hover:opacity-100 lg:group-hover:translate-y-0
                sailec-medium
              "
            >
              <h3 className="whitespace-pre-line text-4xl leading-tight tracking-tight md:text-[88px]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-white/80 md:text-[26px] ">{item.author}</p>
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

    </section>


    
    {/* In Partnership with */}
    <section className="bg-white w-full py-14 overflow-hidden">
      <motion.div
        className="flex flex-col justify-center items-center gap-10"
        variants={fadeLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div>
          <Header>OUR PARTNERS IN FAIR TRADE</Header>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 lg:gap-30"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {[wftoAsia, wfto, philexport, ccap].map((src, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <Image src={src} height={100} width={100} alt={`partner-${idx}`} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
    
    </>


  );
}

"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

// Images
import wftoAsia from "@/assets/images/wfto-asia.png";
import wfto from "@/assets/images/wfto.png";
import philexport from "@/assets/images/philexport.png";
import ccap from "@/assets/images/ccap.png";

import img1 from "@/assets/images/featured-products/img1.jpg";
import img2 from "@/assets/images/featured-products/img2.jpg";
import img3 from "@/assets/images/featured-products/img3.jpg";
import img4 from "@/assets/images/featured-products/img4.jpg";
import img5 from "@/assets/images/featured-products/img5.jpg";

import founder from "@/assets/images/sister-juliaan.png";
import philosphy from "@/assets/images/philosophy-img.jpg";

import Header from "@/components/Header";

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

  const featuredProductsList = [
    { id: 1, title: "Basket Tray 2", desc: "Oblong cogon basket tray with small handles", img: img5 },
    { id: 2, title: "Hanging Decor", desc: "Capiz and brass mother-and-child decor", img: img3 },
    { id: 3, title: "Hanging Ornament", desc: "Starlink Bird Jose hanging ornament and capiz brass", img: img1 },
    { id: 4, title: "Basket", desc: "Mini bayong woven from natural rattan", img: img4 },
    { id: 5, title: "Mortar and Pestle", desc: "Acacia wood mortar and pestle with a tarpered round design", img: img2 },
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

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    show: {
      opacity: 1,
      x: 0,
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
        {/* Philosophy */}
        <section className="relative w-full overflow-hidden">
          <Image
            src={philosphy}
            alt="Handicrafts shelves background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.6)_30%,rgba(0,0,0,0.3)_60%,rgba(0,0,0,0.8)100%)]" />

          <div className="relative pt-50.5 px-9 pb-45.5">
            <div className="mx-auto w-full max-w-300 text-center">
              <p className="sailec-bold text-[#D8E58D] helvetica-bold tracking-wide text-[16px] sm:text-[32px]">
                SAFRUDI PHILOSOPHY
              </p>

              <div className="relative mt-6 sm:mt-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-2 sm:-left-6 top-0 text-[#D8E58D] text-[56px] sm:text-[72px] md:text-[90px] xl:text-[298px] leading-none select-none AbhayaLibre-ExtraBold"
                >
                  “
                </span>

                <span
                  aria-hidden="true"
                  className="absolute -right-2 sm:-right-6 top-0 text-[#D8E58D] text-[56px] sm:text-[72px] md:text-[90px] xl:text-[298px] leading-none select-none AbhayaLibre-ExtraBold"
                >
                  ”
                </span>

                <h1 className="mx-auto text-white helvetica-bold uppercase leading-tight text-[clamp(22px,3.2vw,44px)] px-6 sm:px-10 helvetica-regular">
                  EVERY MAN HAS THE RIGHT TO LIFE AND THE MEANS NECESSARY AND SUITABLE FOR THE PROPER DEVELOPMENT OF LIFE
                  TO ITS FULLNESS
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Our Founder */}
        <section className="bg-gradient-to-b from-[#215348] to-[#092723]">

          {/* Outer spacing */}
          <div className="pt-[90.5px] pb-[120.5px] px-6 xl:px-[150px] 2xl:px-[217.5px] flex justify-center">

            {/* Main container */}
            <div className="w-full max-w-[1485px] flex flex-col-reverse items-center xl:items-stretch xl:flex-row xl:justify-between gap-12 xl:gap-10">

              {/* LEFT CONTENT */}
              <motion.div className="w-full xl:w-[820px] text-white"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h1 className="text-[#E4E9A7] helvetica-bold text-[28px] sm:text-[32px] xl:mb-[24px]">
                  OUR STORY
                </h1>

                <p className="mb-6 leading-relaxed sailec-regular text-[16px] sm:text-[18px] text-white text-justify">
                  The Social Action for Filipino Youth (SAFFY) began in Manila in 1966 through the initiative of Sister Juliaan Mullie, ICM. Moved by the poverty she witnessed, she started a sewing project with no capital—borrowing machines, using an old door as a cutting table, and relying on the generosity of friends and parish communities. Donations and support from local and international partners helped expand training workshops and income-generating activities for out-of-school youth in Manila, Makati, Quezon City, and later in provinces across Luzon, Visayas, and Mindanao. 
                </p>

                <p className="mb-6 leading-relaxed sailec-regular text-[16px] sm:text-[18px] text-white text-justify">
                  In 1970, the organization was incorporated as Social Action Foundation for Rural and Urban Development, Inc. (SAFRUDI), a non-stock, non-profit social development organization rooted in Christian values. For decades, SAFRUDI pursued social enterprise initiatives, using SAFFY as its trade name to export quality Fair Trade products worldwide. Locally, the Mano Mano Store brought Filipino-crafted products closer to home. 
                </p>

                <p className="mb-8 leading-relaxed sailec-regular text-[16px] sm:text-[18px] text-white text-justify">
                  Through its Integrated Social Development Programs (ISDP), the Foundation continues to support grassroots People’s Organizations through training and project assistance, promoting self-reliance and community development. 
                </p>

                <p className="mb-8 leading-relaxed sailec-regular text-[16px] sm:text-[18px] text-white text-justify">
                  In 2013, SAFFY, Inc. was established as an independent trading corporation to strengthen partnerships with buyers such as Ten Thousand Villages USA, SERRV International, Trades of Hope, EZA Fairer Handel, El Puente, Solidar Monde, and Oxfam Magasins, as well as with producers and artisans under Fair Trade principles, further advancing opportunities for marginalized communities while promoting Filipino craftsmanship globally. 
                </p>

                <button className="mt-6 text-[#05251F] sailec-medium bg-[#E4E9A7] pt-3 pb-1.5 px-5 rounded-full">
                  LEARN MORE
                </button>
              </motion.div>

              {/* RIGHT IMAGE */}
              <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="w-full md:w-[400px] xl:w-[605px] flex xl:flex-col xl:justify-start">
                <Image
                  src={founder}
                  alt="Founder"
                  className="w-full h-auto xl:h-full object-contain"
                  priority
                />
              </motion.div>

            </div>
          </div>

        </section>

        {/* Featured Products */}
        <motion.section
          className="w-full min-h-225.25 bg-[#E1F1D5]"
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
          <div className="pt-12 md:pt-16 lg:pt-20 text-center px-4 md:px-10 lg:px-0">
            <h1 className="helvetica-bold text-[24px] md:text-[28px] lg:text-[32px]">
              FEATURED PRODUCTS
            </h1>
            <h1 className="mt-3 sailec-regular text-[#52726E] text-[18px] md:text-[22px] lg:text-[28px]">
              Discover products that reflects our purpose
            </h1>
          </div>

          {/* Grid (fixed: container + motion children) */}
          <div className="mt-10 md:mt-12 lg:mt-15 px-4 md:px-10 lg:px-34.5">
            <div className="mx-auto w-full max-w-350">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 md:gap-6 lg:gap-9"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {featuredProductsList.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    className="flex flex-col items-center md:items-start"
                  >
                    <div className="relative w-full aspect-3/4 overflow-hidden rounded-[20px]">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 280px"
                      />
                    </div>

                    <h1 className="mt-4 md:mt-5 lg:mt-6 sailec-bold text-[22px] md:text-[24px] lg:text-[28px] text-[#0B2A26] text-center md:text-left">
                      {item.title}
                    </h1>
                    <h1 className="mt-1.5 sailec-regular text-[14px] md:text-[16px] lg:text-[18px] text-[#52726E] text-center md:text-left">
                      {item.desc}
                    </h1>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Button */}
          <div className="py-15 text-center px-4">
            <button className="text-[#E1F1D5] bg-[#0B2B26] pt-3 pb-1.5 px-5 rounded-full sailec-medium text-[16px] cursor-pointer hover:scale-110 transition-transform">
              VIEW MORE PRODUCTS
            </button>
          </div>
        </motion.section>

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
        <motion.section
          className="bg-white w-full py-14 overflow-hidden"
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
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
                <motion.div key={idx} variants={fadeUp} className="flex justify-center">
                  <Image src={src} height={100} width={100} alt={`partner-${idx}`} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>
    </>
  );
}

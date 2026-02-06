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

    {/* Our Founder */}
    <section className="w-full bg-linear-to-b from-[#215348] to-[#092723] py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
          
          {/* Text */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-2xl tracking-widest text-[#E4E9A7] helvetica-bold">
              OUR FOUNDER
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-white md:text-base text-justify sailec-regular">
              From the belief of Sister Juliaan Mullie, ICM, a Belgian missionary nun,
              that one can “Fight Hunger Through Work”, the SAFFY or Social Action for
              Filipino Youth saw the light of day in 1966. This organization created
              alternative sources of livelihood for the unemployed and out-of-school
              youths living in the marginalized areas of Manila.
            </p>

            <p className="mt-5 text-sm leading-relaxed text-white md:text-base text-justify sailec-regular">
              The organization was later incorporated in 1970 as Social Action
              Foundation for Rural and Urban Development, Inc. or SAFRUDI, a non-stock,
              non-profit social development entity imbued with Christian values.
            </p>

            <div className="mt-8">
              <button
                className="rounded-full bg-[#E4E9A7] px-5 py-2 text-xs sailec-medium text-[#05251F] transition-transform hover:scale-105 md:text-sm"
              >
                LEARN MORE
              </button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="w-full md:w-1/2"
          >
            <div className="mx-auto w-full max-w-md md:ml-auto md:max-w-lg">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-white/5 shadow-lg ring-1 ring-white/10">
                {/* Replace src with your actual founder image */}
                <Image
                  src={img1} // <-- change this to your asset import or path
                  alt="Our Founder"
                  fill
                  // sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>


    {/* Featured Products */}
    <section className="w-full bg-[#E1F1D5] py-20">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto w-full max-w-7xl px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Header>FEATURED PRODUCTS</Header>
          <Subheader>Discover products that reflects our purpose</Subheader>
        </div>

        {/* Products */}
        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-5">
          {featuredProductsList.map((p) => (
            <article key={p.id} className="flex flex-col">
              
              {/* Bigger Image Card */}
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-md">
                <div className="relative aspect-4/5 w-full">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              {/* Text */}
              <h3 className="mt-5 text-xl sailec-bold text-[#0B2A26]">
                {p.title}
              </h3>
              <p className="mt-1 text-sm sailec-regular text-[#52726E]">
                {p.desc}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <button className="rounded-full bg-[#0B2B26] px-4 py-2 text-sm font-medium text-[#E1F1D5] transition-transform hover:scale-105">
            VIEW MORE PRODUCTS
          </button>
        </div>

      </motion.div>
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
                bg-linear-to-b from-black/10 to-[#06332B]/40
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
              <h3 className="whitespace-pre-line text-4xl leading-tight tracking-tight md:text-5xl">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-white/80">{item.author}</p>
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
        <h1 className="text-[#E1F1D5] bg-[#0B2B26] rounded-full py-2 px-4 text-sm sailec-medium cursor-pointer hover:scale-105 transition-transform">
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
          <Header>IN PARTNERSHIP WITH</Header>
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
              <Image src={src} height={70} width={70} alt={`partner-${idx}`} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
    
    </>


  );
}

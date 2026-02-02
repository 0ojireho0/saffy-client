"use client"
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

// Icons
import wftoAsia from "@/assets/images/wfto-asia.png"
import wfto from "@/assets/images/wfto.png"
import philexport from "@/assets/images/philexport.png"
import pchi from "@/assets/images/pchi.png"
import eccp from "@/assets/images/eccp.jpg"
import ccap from "@/assets/images/ccap.png"

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


  return (
    <>


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
    </section>

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
          <h1 className="helvetica-bold font-bold text-2xl">
            IN PARTNERSHIP WITH
          </h1>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 md:gap-20 lg:gap-30"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {[wftoAsia, wfto, philexport, pchi, ccap, eccp].map((src, idx) => (
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

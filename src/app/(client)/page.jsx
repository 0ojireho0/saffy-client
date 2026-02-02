"use client"
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

// Icons
import wftoAsia from "@/assets/images/wfto-asia.png"
import wfto from "@/assets/images/wfto.png"
import philexport from "@/assets/images/philexport.png"
import pchi from "@/assets/images/pchi.png"
import eccp from "@/assets/images/eccp.jpg"
import ccap from "@/assets/images/ccap.png"

export default function Home() {

const partnersRef = useRef(null);
const [inView, setInView] = useState(false);

useEffect(() => {
  const el = partnersRef.current;
  if (!el) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect(); // animate once
      }
    },
    { threshold: 1 }
  );

  observer.observe(el);
  return () => observer.disconnect();
}, []);


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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.js file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>

    {/* 3 Images with hover animation */}
    <section className="">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3"
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
              aspect-4/5 cursor-pointer
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
              <h3 className="whitespace-pre-line text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
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
      <h1 className="text-[#E1F1D5] bg-[#0B2B26] rounded-full p-3 text-sm sailec-medium cursor-pointer hover:scale-105 transition-transform">
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

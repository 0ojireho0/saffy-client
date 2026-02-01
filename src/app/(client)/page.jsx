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
    
    {/* In Partnership with */}
    <div
      ref={partnersRef}
      className="bg-white w-full py-14 flex flex-col justify-center items-center gap-10 overflow-hidden"
    >
      <motion.div
        initial={{ x: -120, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -120, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="flex flex-col justify-center items-center gap-10"
      >
        <div>
          <h1 className="font-helvetica font-bold text-2xl">
            IN PARTNERSHIP WITH
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 md:gap-20 lg:gap-30">
          <Image src={wftoAsia} height={70} width={70} alt="wftoAsia" />
          <Image src={wfto} height={70} width={70} alt="wtfo" />
          <Image src={philexport} height={70} width={70} alt="Philexport" />
          <Image src={pchi} height={70} width={70} alt="PCHI" />
          <Image src={ccap} height={70} width={70} alt="CCAP" />
          <Image src={eccp} height={70} width={70} alt="ECCP" />
        </div>
      </motion.div>
    </div>
    
    </>


  );
}

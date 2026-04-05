"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import differenceImage from "@/assets/images/about/how-we-make-difference.png";
import { Shapes } from "lucide-react";

export default function DifferenceSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 220, damping: 24 },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 220, damping: 24 },
    },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  return (
    <section className="w-full rounded-[24px] overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 xl:px-12 xl:py-16">
        <div className="grid grid-cols-1 items-center gap-8 md:gap-10 xl:grid-cols-[1fr_1.05fr] xl:gap-16">
          {/* LEFT CONTENT */}
          <motion.div
            className="order-2 xl:order-1"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="mb-4 sm:mb-5"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Shapes
                className="h-12 w-12 text-[#227369] sm:h-14 sm:w-14 md:h-16 md:w-16"
                strokeWidth={1.8}
              />
            </motion.div>

            <motion.h2
              className="mb-5 text-[24px] font-bold uppercase leading-tight text-[#143A36] helvetica-bold"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              HOW WE MAKE A DIFFERENCE
            </motion.h2>

            <motion.div
              className="space-y-6 sailec-regular max-w-[700px] text-[16px] leading-[1.6] text-[#52726E] sm:text-[18px] md:text-[20px] xl:text-[20px] sailec-regular text-justify" 
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p variants={fadeUp}>
                As a Fair Trade organization, SAFFY seeks to improve the lives of
                producers and artisans (artisans are workers in skilled trades,
                especially those who make things by hand) by ensuring they receive
                fair prices for their products. This enables them to meet basic needs
                such as education and health care, and creates new opportunities for
                growth in their livelihoods and overall living conditions.
              </motion.p>

              <motion.p variants={fadeUp}>
                We also support producers by providing skills training in various
                aspects of livelihood management, including community organizing,
                product development, marketing, and production. Training workshops
                and symposiums are conducted to further enhance their knowledge of
                relevant information and issues.
              </motion.p>

              <motion.p variants={fadeUp}>
                The goal of SAFFY, Inc. is to help producers eventually become
                self-reliant through their own cooperatives and organizations,
                enabling them to operate independently as strong business enterprises.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="order-1 xl:order-2"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative w-full overflow-hidden rounded-[12px]">
              <motion.div 
                className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] xl:aspect-[1.35/1] w-full"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={differenceImage}
                  alt="How we make a difference"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 55vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
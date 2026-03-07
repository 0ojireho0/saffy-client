"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import potImg from "@/assets/images/service/pot.png";
import birdImg from "@/assets/images/service/bird.png";
import bagImg from "@/assets/images/service/bag.png";
import trayImg from "@/assets/images/service/tray.png";
import earringsImg from "@/assets/images/service/earrings.png";

import coreService1 from "@/assets/images/service/core-service-1.png";
import coreService2 from "@/assets/images/service/core-service-2.png";
import coreService3 from "@/assets/images/service/core-service-3.png";

import { ShieldCheck, Package2, Tag } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function ProductsShowcase() {
  return (
    <>
      <section className="w-full">
        <div className="relative overflow-hidden bg-[#0C1E1A]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(18,91,74,0.95)_0%,_rgba(12,43,37,0.95)_38%,_rgba(8,20,18,1)_100%)]" />
          <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.45)]" />

          <div className="relative mx-auto w-full max-w-[1440px]">
            {/* DESKTOP */}
            <motion.div
              className="relative hidden min-h-[1000px] xl:block"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <FloatingCard
                className="absolute left-[6%] top-[60px] h-[180px] w-[180px] 2xl:h-[228px] 2xl:w-[228px] rounded-[8px]"
                floatDelay={0}
              >
                <Image src={potImg} alt="Pot" fill className="object-cover" priority />
                <BottomFade />
              </FloatingCard>

              <FloatingCard
                className="absolute left-1/2 top-[70px] h-[95px] w-[95px] -translate-x-1/2 2xl:h-[129px] 2xl:w-[129px] rounded-[8px]"
                floatDelay={0.4}
              >
                <Image src={birdImg} alt="Bird" fill className="object-cover" priority />
                <BottomFade />
              </FloatingCard>

              <FloatingCard
                className="absolute right-[6%] top-[70px] h-[180px] w-[180px] 2xl:h-[228px] 2xl:w-[228px] rounded-[8px]"
                floatDelay={0.8}
              >
                <Image src={bagImg} alt="Bag" fill className="object-cover" priority />
                <BottomFade />
              </FloatingCard>

              <FloatingCard
                className="absolute xl:left-[3%] 2xl:-left-[3%] bottom-[80px] h-[250px] w-[250px] 2xl:h-[350px] 2xl:w-[350px] rounded-[8px]"
                floatDelay={1.2}
              >
                <Image src={trayImg} alt="Tray" fill className="object-cover" priority />
              </FloatingCard>

              <FloatingCard
                className="absolute xl:right-[3%] 2xl:-right-[3%] bottom-[80px] h-[250px] w-[250px] 2xl:h-[350px] 2xl:w-[350px] rounded-[8px]"
                floatDelay={1.6}
              >
                <Image src={earringsImg} alt="Earrings" fill className="object-cover" priority />
              </FloatingCard>

              <motion.div
                className="absolute left-1/2 top-1/2 flex w-full max-w-[760px] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center px-6"
                variants={fadeUp}
              >
                <motion.p
                  variants={fadeUp}
                  className="mb-4 text-[24px] uppercase leading-none text-[#E4E9A7] helvetica-bold 2xl:mb-6 2xl:text-[36px]"
                >
                  OUR PRODUCTS
                </motion.p>

                <motion.h2
                  variants={fadeUp}
                  className="w-full text-[56px] uppercase leading-[0.95] text-[#F4F2ED] helvetica-bold 2xl:text-[81px]"
                >
                  HANDMADE
                  <br />
                  WITH PURPOSE
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="mt-10 max-w-[640px] text-justify text-[16px] leading-[1.55] text-[#F4F2ED] sailec-regular 2xl:mt-[74px] 2xl:max-w-[760px] 2xl:text-[20px]"
                >
                  We offer a wide selection of handmade products crafted by our
                  community of small Filipino artisan groups. From our signature capiz
                  pieces to creations made of abaca, acacia wood, and cornhusk, each
                  item is thoughtfully made with dedication and care, directly supporting
                  our artisans and giving deeper meaning to every purchase.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* TABLET */}
            <motion.div
              className="hidden lg:block xl:hidden px-8 py-14"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="grid grid-cols-3 gap-5">
                <FloatingCard className="relative h-[150px] rounded-[8px]" floatDelay={0}>
                  <Image src={potImg} alt="Pot" fill className="object-cover" />
                  <BottomFade />
                </FloatingCard>

                <FloatingCard className="relative h-[150px] rounded-[8px]" floatDelay={0.3}>
                  <Image src={birdImg} alt="Bird" fill className="object-cover" />
                  <BottomFade />
                </FloatingCard>

                <FloatingCard className="relative h-[150px] rounded-[8px]" floatDelay={0.6}>
                  <Image src={bagImg} alt="Bag" fill className="object-cover" />
                  <BottomFade />
                </FloatingCard>
              </div>

              <motion.div
                className="mx-auto mt-10 flex max-w-[720px] flex-col items-center text-center"
                variants={fadeUp}
              >
                <motion.p
                  variants={fadeUp}
                  className="mb-3 text-[24px] uppercase leading-none text-[#E4E9A7] helvetica-bold"
                >
                  OUR PRODUCTS
                </motion.p>

                <motion.h2
                  variants={fadeUp}
                  className="text-[56px] uppercase leading-[0.95] text-[#F4F2ED] helvetica-bold"
                >
                  HANDMADE
                  <br />
                  WITH PURPOSE
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="mt-6 max-w-[620px] text-center text-[17px] leading-[1.6] text-[#F4F2ED] sailec-regular"
                >
                  We offer a wide selection of handmade products crafted by our
                  community of small Filipino artisan groups. From our signature capiz
                  pieces to creations made of abaca, acacia wood, and cornhusk, each
                  item is thoughtfully made with dedication and care, directly supporting
                  our artisans and giving deeper meaning to every purchase.
                </motion.p>
              </motion.div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <FloatingCard className="relative aspect-[1.15/1] rounded-[8px]" floatDelay={0.9}>
                  <Image src={trayImg} alt="Tray" fill className="object-cover" />
                </FloatingCard>

                <FloatingCard className="relative aspect-[1.15/1] rounded-[8px]" floatDelay={1.2}>
                  <Image src={earringsImg} alt="Earrings" fill className="object-cover" />
                </FloatingCard>
              </div>
            </motion.div>

            {/* MOBILE */}
            <motion.div
              className="flex flex-col px-4 py-8 sm:px-6 sm:py-10 lg:hidden"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <FloatingCard className="relative h-[88px] sm:h-[110px] rounded-[6px]" floatDelay={0}>
                  <Image src={potImg} alt="Pot" fill className="object-cover" />
                  <BottomFade />
                </FloatingCard>

                <FloatingCard className="relative h-[88px] sm:h-[110px] rounded-[6px]" floatDelay={0.2}>
                  <Image src={birdImg} alt="Bird" fill className="object-cover" />
                  <BottomFade />
                </FloatingCard>

                <FloatingCard className="relative h-[88px] sm:h-[110px] rounded-[6px]" floatDelay={0.4}>
                  <Image src={bagImg} alt="Bag" fill className="object-cover" />
                  <BottomFade />
                </FloatingCard>
              </div>

              <motion.div
                className="mx-auto mt-8 flex max-w-[360px] flex-col items-center text-center sm:max-w-[460px]"
                variants={fadeUp}
              >
                <motion.p
                  variants={fadeUp}
                  className="mb-2 text-[16px] uppercase leading-none text-[#E4E9A7] helvetica-bold sm:text-[20px]"
                >
                  OUR PRODUCTS
                </motion.p>

                <motion.h2
                  variants={fadeUp}
                  className="text-[34px] uppercase leading-[0.95] text-[#F4F2ED] helvetica-bold sm:text-[46px]"
                >
                  HANDMADE
                  <br />
                  WITH PURPOSE
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="mt-5 text-[13px] leading-[1.6] text-[#F4F2ED] sailec-regular sm:text-[15px]"
                >
                  We offer a wide selection of handmade products crafted by our
                  community of small Filipino artisan groups. From our signature capiz
                  pieces to creations made of abaca, acacia wood, and cornhusk, each
                  item is thoughtfully made with dedication and care, directly supporting
                  our artisans and giving deeper meaning to every purchase.
                </motion.p>
              </motion.div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5">
                <FloatingCard className="relative aspect-square rounded-[6px] sm:rounded-[8px]" floatDelay={0.6}>
                  <Image src={trayImg} alt="Tray" fill className="object-cover" />
                </FloatingCard>

                <FloatingCard className="relative aspect-square rounded-[6px] sm:rounded-[8px]" floatDelay={0.8}>
                  <Image src={earringsImg} alt="Earrings" fill className="object-cover" />
                </FloatingCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        className="py-[18px] text-center bg-[#192522] text-white"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="helvetica-bold text-xl md:text-[32px]">CORE SERVICES</h1>
      </motion.section>

      <section className="w-full bg-white">
        <motion.div
          className="w-full grid grid-cols-1 md:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
        >
          <ImageBlock
            image={coreService1}
            alt="Quality assurance products display"
            className="order-1 md:order-1"
          />
          <ContentBlock
            icon={<ShieldCheck className="h-8 w-8 md:h-9 md:w-9 text-[#227369]" strokeWidth={1.8} />}
            title="QUALITY ASSURANCE"
            text={[
              "Every product you purchase undergoes a strict and systematic quality assurance process. Each piece is carefully checked to ensure it meets our standards for craftsmanship, accuracy to specifications, durability, and overall quality—so you can receive products that are both beautiful and reliable.",
            ]}
            className="order-2 md:order-2"
          />

          <ContentBlock
            icon={<Package2 className="h-8 w-8 md:h-9 md:w-9 text-[#227369]" strokeWidth={1.8} />}
            title="PACKAGING & SHIPPING"
            text={[
              "With over forty years of experience exporting from the Philippines, SAFFY ensures that every product is carefully packaged for safety and presentation. We offer standard packaging and can also provide customized packaging tailored to your brand, making your products arrive ready for any purpose—whether for retail, gifting, or directly to your clients.",
              "In addition, we ship worldwide, bringing the artistry of Filipino craftsmanship to customers across the globe, no matter the destination.",
            ]}
            className="order-4 md:order-3"
          />
          <ImageBlock
            image={coreService2}
            alt="Packaging and shipping process"
            className="order-3 md:order-4"
          />

          <ImageBlock
            image={coreService3}
            alt="Branding and product labels"
            className="order-5 md:order-5"
          />
          <ContentBlock
            icon={<Tag className="h-8 w-8 md:h-9 md:w-9 text-[#227369]" strokeWidth={1.8} />}
            title="BRANDING"
            text={[
              "We provide product tagging and labelling services for our buyers. From hang tags on your bamboo chimes to barcode stickers on wooden chopping boards, SAFFY takes care of it so your products arrive ready for display or sale.",
            ]}
            className="order-6 md:order-6"
          />
        </motion.div>
      </section>
    </>
  );
}

function FloatingCard({ children, className = "", floatDelay = 0 }) {
  return (
    <motion.div
      variants={zoomIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
      className={`overflow-hidden bg-[#E9E6E1] shadow-[0_8px_20px_rgba(0,0,0,0.18)] ${className}`}
    >
      <div className="relative h-full w-full">{children}</div>
    </motion.div>
  );
}

function BottomFade() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#173B35]/70 to-transparent" />
  );
}

function ImageBlock({ image, alt, className = "" }) {
  return (
    <motion.div
      variants={zoomIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`relative min-h-[240px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[420px] ${className}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
    </motion.div>
  );
}

function ContentBlock({ icon, title, text, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`flex min-h-[240px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[420px] items-center bg-white ${className}`}
    >
      <div className="w-full px-6 py-10 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        <motion.div variants={fadeUp} className="mb-4 md:mb-5">
          {icon}
        </motion.div>

        <motion.h3
          variants={fadeUp}
          className="mb-4 text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold uppercase leading-tight text-[#173B35] helvetica-bold"
        >
          {title}
        </motion.h3>

        <div className="space-y-4 text-[14px] sm:text-[15px] md:text-[15px] lg:text-[17px] leading-[1.65] text-[#5E7773] sailec-regular">
          {text.map((paragraph, index) => (
            <motion.p key={index} variants={fadeUp}>
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
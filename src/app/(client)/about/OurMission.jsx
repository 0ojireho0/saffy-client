import React from "react";
import Image from "next/image";
import heroImg from "@/assets/images/hero-img.png"
import { Goal } from "lucide-react";
import { motion } from "framer-motion";

export default function MissionSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  return (
    <section className="w-full rounded-[24px] overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 xl:px-12 xl:py-16">
        <div className="grid grid-cols-1 items-center gap-8 md:gap-10 xl:grid-cols-[1.15fr_1fr] xl:gap-16">
          
          {/* Image */}
          <motion.div
            className="relative w-full overflow-hidden rounded-[12px]"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] xl:aspect-[16/9] w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src={heroImg}
                alt="Mission"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 55vw"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex flex-col justify-center text-left"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="mb-4 sm:mb-5"
              variants={fadeUp}
            >
              <Goal
                className="h-12 w-12 text-[#227369] sm:h-14 sm:w-14 md:h-16 md:w-16"
                strokeWidth={1.8}
              />
            </motion.div>

            <motion.h2
              className="helvetica-bold mb-4 leading-none font-bold uppercase text-[#0A2925] text-[24px]"
              variants={fadeUp}
            >
              Our Mission
            </motion.h2>

            <motion.p
              className="max-w-[700px] text-[16px] leading-[1.6] text-[#52726E] sm:text-[18px] md:text-[20px] xl:text-[20px] sailec-regular text-justify"
              variants={fadeUp}
            >
              To organize marginalized communities and small producers to become self-reliant; to
              share knowledge, skills, and resources in promoting livelihood, health, and sustainable
              agriculture; and to create and market new products according to Fair Trade standards.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
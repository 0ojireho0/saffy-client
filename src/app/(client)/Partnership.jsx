import React from 'react'
import Image from 'next/image';



// Images
import wftoAsia from "@/assets/images/wfto-asia.png";
import wfto from "@/assets/images/wfto.png";
import philexport from "@/assets/images/philexport.png";
import ccap from "@/assets/images/ccap.png";

import { motion } from "framer-motion";

import Header from "@/components/Header";

function Partnership() {

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


  return (
        <motion.section
          className="bg-white w-full py-20 overflow-hidden"
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
  )
}

export default Partnership

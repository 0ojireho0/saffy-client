import React from "react";
import founder from "@/assets/images/sister-juliaan.png";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Founder() {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  return (
    <section className="bg-gradient-to-b from-[#215348] to-[#092723]">
      <div className="px-4 sm:px-6 lg:px-12 xl:px-[150px] 2xl:px-[217.5px]">
        <div className="mx-auto w-full max-w-[1485px] pt-14 sm:pt-16 md:pt-20 xl:pt-[90.5px] pb-16 sm:pb-20 xl:pb-[120.5px]">
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10 xl:gap-10 items-center">
            {/* LEFT CONTENT */}
            <motion.div
              className="text-white order-2 2xl:order-1"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h1 className="text-[#E4E9A7] helvetica-bold text-[26px] sm:text-[30px] md:text-[32px] xl:mb-[24px]">
                OUR STORY
              </h1>

              <p className="mb-6 leading-relaxed sailec-regular text-[15px] sm:text-[16px] md:text-[18px] text-white text-justify">
                The Social Action for Filipino Youth (SAFFY) began in Manila in 1966 through the initiative
                of Sister Juliaan Mullie, ICM. Moved by the poverty she witnessed, she started a sewing
                project with no capital—borrowing machines, using an old door as a cutting table, and
                relying on the generosity of friends and parish communities. Donations and support from
                local and international partners helped expand training workshops and income-generating
                activities for out-of-school youth in Manila, Makati, Quezon City, and later in provinces
                across Luzon, Visayas, and Mindanao.
              </p>

              <p className="mb-6 leading-relaxed sailec-regular text-[15px] sm:text-[16px] md:text-[18px] text-white text-justify">
                In 1970, the organization was incorporated as Social Action Foundation for Rural and Urban
                Development, Inc. (SAFRUDI), a non-stock, non-profit social development organization rooted
                in Christian values. For decades, SAFRUDI pursued social enterprise initiatives, using SAFFY
                as its trade name to export quality Fair Trade products worldwide. Locally, the Mano Mano
                Store brought Filipino-crafted products closer to home.
              </p>

              <p className="mb-8 leading-relaxed sailec-regular text-[15px] sm:text-[16px] md:text-[18px] text-white text-justify">
                Through its Integrated Social Development Programs (ISDP), the Foundation continues to
                support grassroots People’s Organizations through training and project assistance,
                promoting self-reliance and community development.
              </p>

              <p className="mb-8 leading-relaxed sailec-regular text-[15px] sm:text-[16px] md:text-[18px] text-white text-justify">
                In 2013, SAFFY, Inc. was established as an independent trading corporation to strengthen
                partnerships with buyers such as Ten Thousand Villages USA, SERRV International, Trades of
                Hope, EZA Fairer Handel, El Puente, Solidar Monde, and Oxfam Magasins, as well as with
                producers and artisans under Fair Trade principles, further advancing opportunities for
                marginalized communities while promoting Filipino craftsmanship globally.
              </p>

              <Link
                href={"/about"}
                className="mt-6 inline-block text-[#05251F] sailec-medium bg-[#E4E9A7] pt-3 pb-1.5 px-5 rounded-full"
              >
                LEARN MORE
              </Link>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 2xl:order-2 w-full"
            >
              <div className="relative w-full h-[360px] sm:h-[460px] md:h-[560px] xl:h-[620px] 2xl:h-[760px]">
                <Image
                  src={founder}
                  alt="Founder"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1536px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
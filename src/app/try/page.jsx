import React from "react";

import founder from "@/assets/images/sister-juliaan.png";
import Image from "next/image";

function Try() {
  return (
    <section className="bg-gradient-to-b from-[#215348] to-[#092723]">

      {/* Outer spacing */}
      <div className="pt-[90.5px] pb-[120.5px] px-6 xl:px-[150px] 2xl:px-[217.5px] flex justify-center">

        {/* Main container */}
        <div className="w-full max-w-[1485px] flex flex-col-reverse items-center xl:items-stretch xl:flex-row xl:justify-between gap-12 xl:gap-10">

          {/* LEFT CONTENT */}
          <div className="w-full xl:w-[820px] text-white">
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
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full md:w-[400px] xl:w-[605px] flex xl:flex-col xl:justify-start">
            <Image
              src={founder}
              alt="Founder"
              className="w-full h-auto xl:h-full object-contain"
              priority
            />
          </div>

        </div>
      </div>

    </section>
  );
}

export default Try;

import React from "react";
import Image from "next/image";
import philosphy from "@/assets/images/philosophy-img.jpg";

export default function Philosophy() {
  return (
    <section className="relative w-full h-[520px] sm:h-[600px] md:h-[700px] xl:h-[820px] overflow-hidden">
      
      {/* Background Image */}
      <Image
        src={philosphy}
        alt="Handicrafts shelves background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-8">
        <div className="max-w-[1400px] text-center">

          {/* Top Label */}
          <p className="text-[#D8E58D] helvetica-bold tracking-wide text-[14px] sm:text-[18px] md:text-[22px] xl:text-[28px] mb-4 sm:mb-6">
            SAFRUDI PHILOSOPHY
          </p>

          {/* Quote Wrapper */}
          <div className="relative">

            {/* Left Quote */}
            <span
              aria-hidden="true"
              className="absolute -left-4 sm:-left-8 md:-left-12 xl:-left-24 top-1/2 -translate-y-1/2 text-[#D8E58D] 
              text-[60px] sm:text-[90px] md:text-[120px] xl:text-[220px] leading-none select-none AbhayaLibre-ExtraBold"
            >
              “
            </span>

            {/* Right Quote */}
            <span
              aria-hidden="true"
              className="absolute -right-4 sm:-right-8 md:-right-12 xl:-right-24 top-1/2 -translate-y-1/2 text-[#D8E58D] 
              text-[60px] sm:text-[90px] md:text-[120px] xl:text-[220px] leading-none select-none AbhayaLibre-ExtraBold"
            >
              ”
            </span>

            {/* Main Quote Text */}
            <h1 className="
              text-white
              uppercase
              helvetica-regular
              leading-tight
              text-[18px]
              sm:text-[26px]
              md:text-[34px]
              xl:text-[56px]
              px-6 sm:px-16
            ">
              EVERY MAN HAS THE RIGHT TO LIFE AND THE MEANS NECESSARY AND SUITABLE
              FOR THE PROPER DEVELOPMENT OF LIFE TO ITS FULLNESS
            </h1>

          </div>
        </div>
      </div>
    </section>
  );
}
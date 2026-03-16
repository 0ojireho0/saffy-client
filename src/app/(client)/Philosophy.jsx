import React from "react";
import Image from "next/image";
import philosphy from "@/assets/images/philosophy-img.jpg";

export default function Philosophy() {
  return (
    <section className="relative w-full h-[420px] sm:h-[520px] md:h-[620px] lg:h-[720px] xl:h-[820px] overflow-hidden">
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
      <div className="relative flex h-full items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-[1500px] text-center">
          {/* Top Label */}
          <p className="mb-4 helvetica-bold tracking-wide text-[#D8E58D] text-[13px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px]">
            SAFRUDI PHILOSOPHY
          </p>

          {/* Quote Wrapper */}
          <div className="relative mx-auto max-w-[95%] sm:max-w-[92%] lg:max-w-[88%] xl:max-w-[1500px]">
            {/* Left Quote */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-1/2 -translate-x-[15%] -translate-y-1/2 select-none leading-none text-[#D8E58D] AbhayaLibre-ExtraBold text-[52px] sm:text-[72px] md:text-[96px] lg:text-[120px] xl:text-[180px] 2xl:text-[220px]"
            >
              “
            </span>

            {/* Right Quote */}
            <span
              aria-hidden="true"
              className="absolute right-0 top-1/2 translate-x-[15%] -translate-y-1/2 select-none leading-none text-[#D8E58D] AbhayaLibre-ExtraBold text-[52px] sm:text-[72px] md:text-[96px] lg:text-[120px] xl:text-[180px] 2xl:text-[220px]"
            >
              ”
            </span>

            {/* Main Quote Text */}
            <h1
              className="
                px-8 sm:px-14 md:px-20 lg:px-24 xl:px-28
                text-white
                uppercase
                helvetica-regular
                leading-tight
                text-[20px]
                sm:text-[28px]
                md:text-[36px]
                lg:text-[44px]
                xl:text-[52px]
                2xl:text-[56px]
              "
            >
              EVERY MAN HAS THE RIGHT TO LIFE AND THE MEANS NECESSARY AND SUITABLE
              FOR THE PROPER DEVELOPMENT OF LIFE TO ITS FULLNESS
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
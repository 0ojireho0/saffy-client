import React from "react";
import Image from "next/image";
import missionImage from "@/assets/images/about/our-mission.png";
import { Goal } from "lucide-react";

export default function MissionSection() {
  return (
    <section className="w-full rounded-[24px] overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 xl:px-12 xl:py-16">
        <div className="grid grid-cols-1 items-center gap-8 md:gap-10 xl:grid-cols-[1.15fr_1fr] xl:gap-16">
          
          {/* Image */}
          <div className="relative w-full overflow-hidden rounded-[12px]">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] xl:aspect-[16/9] w-full">
              <Image
                src={missionImage}
                alt="Mission"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 55vw"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center text-left">
            <div className="mb-4 sm:mb-5">
              <Goal className="h-12 w-12 text-[#227369] sm:h-14 sm:w-14 md:h-16 md:w-16" strokeWidth={1.8} />
            </div>

            <h2 className="helvetica-bold mb-4 leading-none font-bold uppercase text-[#0A2925] text-[24px]">
              Our Mission
            </h2>

            <p className="max-w-[700px] text-[16px] leading-[1.6] text-[#52726E] sm:text-[18px] md:text-[20px] xl:text-[20px] sailec-regular ">
              To organize marginalized communities and small producers to become self-reliant; to
              share knowledge, skills, and resources in promoting livelihood, health, and sustainable
              agriculture; and to create and market new products according to Fair Trade standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
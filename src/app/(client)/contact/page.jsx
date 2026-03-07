"use client";

import React from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  CalendarDays,
} from "lucide-react";

import differenceImage from "@/assets/images/about/how-we-make-difference.png";
import missionImage from "@/assets/images/about/our-mission.png";

export default function ContactSection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        {/* LEFT IMAGE */}
        <div className="relative min-h-[320px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-full">
          <Image
            src={missionImage}
            alt="SAFFY contact location"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative overflow-hidden bg-[#0D2C27]">
          {/* center glow */}
          <div className="absolute inset-0 bg-linear-to-b from-[#215348] to-[#092723]" />

          <div className="relative z-10 flex h-full items-center px-6 py-10 sm:px-8 sm:py-12 md:px-12 md:py-30 xl:px-20">
            <div className="w-full max-w-[760px]">
              {/* Heading */}
              <div className="mb-[20px] md:mb-[50px] lg:mb-[100px]">
                <h2 className="helvetica-bold text-[#E4E9A7] text-[40px] leading-none">
                  CONTACT DETAILS
                </h2>
                <p className="sailec-regular mt-[24px] text-white text-[20px] leading-[1.5]">
                  Have a question or a project in mind? Get in touch
                </p>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-14 lg:grid-cols-1 xl:grid-cols-2">
                {/* Contact details */}
                <div>
                  <h3 className="helvetica-bold mb-5 text-[#E4E9A7] text-[20px] uppercase">
                    CONTACT DETAILS
                  </h3>

                  <div className="space-y-5">
                    <InfoItem
                      icon={<Mail className="h-7 w-7 sm:h-8 sm:w-8 text-[#E4E9A7]" strokeWidth={2} />}
                      text="marketing@saffyinc.com"
                    />
                    <InfoItem
                      icon={<Phone className="h-7 w-7 sm:h-8 sm:w-8 text-[#E4E9A7]" strokeWidth={2} />}
                      text="09209507589"
                    />
                    <InfoItem
                      icon={<MapPin className="h-7 w-7 sm:h-8 sm:w-8 text-[#E4E9A7]" strokeWidth={2} />}
                      text="2594 Lamayan, Santa Ana, Manila,1009 Metro Manila"
                    />
                  </div>
                </div>

                {/* Socials */}
                <div>
                  <h3 className="helvetica-bold mb-5 text-[#E4E9A7] text-[20px] uppercase">
                    SOCIALS
                  </h3>

                  <div className="space-y-5">
                    <InfoItem
                      icon={<Facebook className="h-7 w-7 sm:h-8 sm:w-8 text-[#E4E9A7]" strokeWidth={2} />}
                      text="FACEBOOK"
                    />
                    <InfoItem
                      icon={<Instagram className="h-7 w-7 sm:h-8 sm:w-8 text-[#E4E9A7]" strokeWidth={2} />}
                      text="INSTAGRAM"
                    />
                  </div>
                </div>

                {/* Business hours */}
                <div className="md:col-span-2 lg:mt-[50px]">
                  <h3 className="helvetica-bold mb-5 text-[#E4E9A7] text-[20px] uppercase">
                    BUSINESS HOURS
                  </h3>

                  <div className="flex items-start gap-4">
                    <CalendarDays
                      className="mt-1 h-7 w-7 shrink-0 sm:h-8 sm:w-8 text-[#E4E9A7]"
                      strokeWidth={2}
                    />
                    <div className="sailec-regular text-white text-[18px] leading-[1.45]">
                      <p>WEEKDAYS: &nbsp; 8:00 PM - 5:00 PM</p>
                      <p>WEEKENDS: &nbsp; CLOSED</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* optional vignette */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.18)]" />
        </div>
      </div>
    </section>
  );
}

function InfoItem({ icon, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0">{icon}</div>
      <p className="sailec-regular text-white text-[18px] leading-[1.4]">
        {text}
      </p>
    </div>
  );
}
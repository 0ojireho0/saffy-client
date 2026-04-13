"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

import useContactForm from "@/hooks/Client/useContactForm";

import { useForm } from "react-hook-form";

export default function ContactSection() {

  const { submitForms } = useContactForm();
  const [loading, setLoading] = useState(false);

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

  const {  register, handleSubmit, formState: { errors }, reset } = useForm();

  const submitContactForm = (data) => {
    setLoading(true);
    submitForms({setLoading, reset, ...data})
  };

  return (
    <>
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
          {/* LEFT IMAGE */}
          <motion.div
            className="relative min-h-[320px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-full"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image
              src={missionImage}
              alt="SAFFY contact location"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            className="relative overflow-hidden bg-[#0D2C27]"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-[#215348] to-[#092723]" />

            <div className="relative z-10 flex h-full items-center px-6 py-10 sm:px-8 sm:py-12 md:px-12 md:py-30 xl:px-20">
              <div className="w-full max-w-[760px]">
                {/* Heading */}
                <motion.div
                  className="mb-[20px] md:mb-[50px] lg:mb-[100px]"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <h2 className="helvetica-bold text-[#E4E9A7] text-[40px] leading-none">
                    CONTACT DETAILS
                  </h2>
                  <p className="sailec-regular mt-[24px] text-white text-[20px] leading-[1.5]">
                    Have a question or a project in mind? Get in touch
                  </p>
                </motion.div>

                {/* Info grid */}
                <motion.div
                  className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-14 lg:grid-cols-1 xl:grid-cols-2"
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {/* Contact details */}
                  <motion.div variants={fadeUp}>
                    <h3 className="helvetica-bold mb-5 text-[#E4E9A7] text-[20px] uppercase">
                      CONTACT DETAILS
                    </h3>

                    <div className="space-y-5">
                      <InfoItem
                        icon={
                          <Mail
                            className="h-7 w-7 sm:h-8 sm:w-8 text-[#E4E9A7]"
                            strokeWidth={2}
                          />
                        }
                        text="marketing@saffyinc.com"
                      />
                      <InfoItem
                        icon={
                          <Phone
                            className="h-7 w-7 sm:h-8 sm:w-8 text-[#E4E9A7]"
                            strokeWidth={2}
                          />
                        }
                        text="09209507589"
                      />
                      <InfoItem
                        icon={
                          <MapPin
                            className="h-7 w-7 sm:h-8 sm:w-8 text-[#E4E9A7]"
                            strokeWidth={2}
                          />
                        }
                        text="2594 Lamayan, Santa Ana, Manila,1009 Metro Manila"
                      />
                    </div>
                  </motion.div>

                  {/* Socials */}
                  <motion.div variants={fadeUp}>
                    <h3 className="helvetica-bold mb-5 text-[#E4E9A7] text-[20px] uppercase">
                      SOCIALS
                    </h3>

                    <div className="space-y-5">
                      <InfoItem
                        icon={
                          <Facebook
                            className="h-7 w-7 sm:h-8 sm:w-8 text-[#E4E9A7]"
                            strokeWidth={2}
                          />
                        }
                        text="FACEBOOK"
                      />
                      <InfoItem
                        icon={
                          <Instagram
                            className="h-7 w-7 sm:h-8 sm:w-8 text-[#E4E9A7]"
                            strokeWidth={2}
                          />
                        }
                        text="INSTAGRAM"
                      />
                    </div>
                  </motion.div>

                  {/* Business hours */}
                  <motion.div
                    variants={fadeUp}
                    className="md:col-span-2 lg:mt-[50px]"
                  >
                    <h3 className="helvetica-bold mb-5 text-[#E4E9A7] text-[20px] uppercase">
                      BUSINESS HOURS
                    </h3>

                    <div className="flex items-start gap-4">
                      <CalendarDays
                        className="mt-1 h-7 w-7 shrink-0 sm:h-8 sm:w-8 text-[#E4E9A7]"
                        strokeWidth={2}
                      />
                      <div className="sailec-regular text-white text-[18px] leading-[1.45]">
                        <p>WEEKDAYS: &nbsp; 8:00 AM - 5:00 PM</p>
                        <p>WEEKENDS: &nbsp; CLOSED</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.18)]" />
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-[#F4F4F2]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT: FORM */}
          <motion.div
            className="order-2 lg:order-1 flex items-center justify-center px-5 py-10 sm:px-8 sm:py-14 md:px-12 md:py-16 xl:px-20 xl:py-20"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="w-full max-w-[600px]">
              <motion.h2
                className="helvetica-bold mb-8 text-center text-[40px] uppercase text-[#0C2F2A] sm:mb-10 xl:mb-12"
                variants={fadeUp}
              >
                Contact Form
              </motion.h2>

              <motion.form
                className="space-y-5 sm:space-y-6 md:space-y-7"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                onSubmit={handleSubmit(submitContactForm)}
              >
                <motion.div variants={fadeUp}>
                  <label
                    htmlFor="name"
                    className="sailec-regular mb-2 block text-[16px] text-[#567572]"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="h-[48px] w-full rounded-[4px] border border-[#D7D7D4] bg-transparent px-4 text-[#0C2F2A] outline-none transition focus:border-[#227369] focus:ring-0 sm:h-[58px] md:h-[64px] sailec-regular"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 sailec-regular">
                      {errors.name.message}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label
                    htmlFor="email"
                    className="sailec-regular mb-2 block text-[16px] text-[#567572]"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="h-[48px] w-full rounded-[4px] border border-[#D7D7D4] bg-transparent px-4 text-[#0C2F2A] outline-none transition focus:border-[#227369] focus:ring-0 sm:h-[58px] md:h-[64px] sailec-regular"
                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Email is invalid" } })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 sailec-regular">
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label
                    htmlFor="subject"
                    className="sailec-regular mb-2 block text-[16px] text-[#567572]"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="h-[48px] w-full rounded-[4px] border border-[#D7D7D4] bg-transparent px-4 text-[#0C2F2A] outline-none transition focus:border-[#227369] focus:ring-0 sm:h-[58px] md:h-[64px] sailec-regular"
                    {...register("subject", { required: "Subject is required", message: "Subject is invalid" })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 sailec-regular">
                      {errors.subject.message}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label
                    htmlFor="message"
                    className="sailec-regular mb-2 block text-[16px] text-[#567572]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="min-h-[112px] w-full rounded-[4px] border border-[#D7D7D4] bg-transparent px-4 py-3 text-[#0C2F2A] outline-none transition focus:border-[#227369] focus:ring-0 sailec-regular"
                    {...register("message", { required: "Message is required" })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 sailec-regular">
                      {errors.message.message}
                    </p>
                  )}
                </motion.div>

                <motion.button
                  variants={fadeUp}
                  type="submit"
                  className="mt-7 sm:mt-8 sailec-medium text-center rounded-full bg-[#E4E9A7] text-[#05251F] transition-transform hover:scale-105 text-[16px] py-3 px-5"
                >
                  {loading ? "Sending..." : "SUBMIT"}
                </motion.button>
              </motion.form>
            </div>
          </motion.div>

          {/* RIGHT: IMAGE */}
          <motion.div
            className="order-1 lg:order-2 relative min-h-[320px] sm:min-h-[420px] md:min-h-[560px] lg:min-h-full"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image
              src={differenceImage}
              alt="Contact form image"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}

function InfoItem({ icon, text }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 240, damping: 22 },
    },
  };

  return (
    <motion.div variants={fadeUp} className="flex items-start gap-4">
      <div className="shrink-0">{icon}</div>
      <p className="sailec-regular text-white text-[18px] leading-[1.4]">
        {text}
      </p>
    </motion.div>
  );
}
"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const explorePages = {
    column1: ["HOME", "PRODUCTS", "BLOGS"],
    column2: ["SERVICE", "ABOUT", "CONTACT"],
  };

  const socials = {
    column1: ["FACEBOOK", "INSTAGRAM"],
    column2: ["SHOPEE", "LAZADA"],
  };

  const hrefForPage = (page) => (page === "HOME" ? "/" : `/${page.toLowerCase()}`);

  return (
    <footer className="p-4 lg:pt-15 xl:px-20 2xl:pl-31.25 2xl:pr-44.5 lg:pb-15 lg:flex lg:flex-col xl:flex-row lg:justify-between xl:gap-84.25 bg-[#002520]">
      <div className="lg:w-lg ">
        <h1 className="sailec-bold text-lg lg:text-[46px] text-[#F6FFEF]">SAFFY INC</h1>
        <h1 className="sailec-medium text-[#F6FFEF] text-sm lg:text-[20px]">2514 Lamayan, Santa Ana,</h1>
        <h1 className="sailec-medium text-[#F6FFEF] text-sm lg:text-[20px]">Manila, 1009 Metro Manila</h1>
      </div>
      
      <div className="text-[#F6FFEF] mt-5 flex flex-col gap-10 lg:flex-row lg:gap-16 xl:gap-32.5 w-full xl:mt-0">
        <div className="border-t lg:border-t-0 w-full">
          <h1 className="sailec-bold xl:text-[20px]">EXPLORE PAGES</h1>
          <div className="mt-2 lg:mt-4.5 grid grid-cols-2 gap-2 xl:gap-x-14.5">
              <a href="#" className="sailec-medium xl:text-[18px]">HOME</a>
              <a href="#" className="sailec-medium xl:text-[18px]">SERVICE</a>
              <a href="#" className="sailec-medium xl:text-[18px]">PRODUCTS</a>
              <a href="#" className="sailec-medium xl:text-[18px]">ABOUT</a>
              <a href="#" className="sailec-medium xl:text-[18px]">BLOGS</a>
              <a href="#" className="sailec-medium xl:text-[18px]">CONTACT</a>
          </div>
        </div>
        <div className="border-t lg:border-t-0 w-full">
          <h1 className="sailec-bold xl:text-[20px]">SOCIALS</h1>
          <div className="mt-2 lg:mt-4.5 grid grid-cols-2 gap-2 xl:gap-x-14.5">
              <a href="#" className="sailec-medium xl:text-[18px]">FACEBOOK</a>
              <a href="#" className="sailec-medium xl:text-[18px]">SHOPEE</a>
              <a href="#" className="sailec-medium xl:text-[18px]">INSTAGRAM</a>
              <a href="#" className="sailec-medium xl:text-[18px]">LAZADA</a>
          </div>
        </div>
        <div className="border-t lg:border-t-0 w-full">
          <h1 className="sailec-bold xl:text-[20px]">EMAIL</h1>
          <div className="mt-2 lg:mt-4.5 grid grid-cols-2 gap-2 xl:gap-x-14.5">
              <a href="mailto:marketing@saffyinc.com" className="sailec-medium xl:text-[18px]">marketing@saffyinc.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

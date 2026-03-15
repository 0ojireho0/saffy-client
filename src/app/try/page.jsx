'use client'
import React, { useState } from "react";
import Image from "next/image";

// Images
import img1 from "@/assets/images/featured-products/img1.jpg";



import { X } from "lucide-react";
import { BrickWall } from 'lucide-react';
import { Palette } from 'lucide-react';
import { Shapes } from 'lucide-react';
import { RulerDimensionLine } from 'lucide-react';
import { Weight } from 'lucide-react';

import axios from "@/lib/axios";

function Try() {
  const [show, setShow] = useState(true);


  const ttry = async() => {

    axios.get('/api/test')
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  ttry()

  return (
    <>
      <div className="bg-white">
        main
      </div>

      {show && (
        <div className="fixed inset-0 z-10 bg-black/40">
          <div className="flex justify-center items-center min-h-screen px-4">
            <div className="bg-[#EEF6E8] w-full max-w-[1200px] flex flex-col md:flex-row md:justify-between rounded-[16.2px] gap-2 lg:gap-[49px] overflow-hidden">

              {/* Image section */}
              <div className="relative w-full md:w-1/2 h-[260px] sm:h-[320px] md:h-auto md:min-h-[720px] bg-white">
                <Image
                  src={img1}
                  alt="image"
                  fill
                  className=" object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Content section */}
              <div className="w-full md:w-1/2 p-3">
                <div className="hidden md:flex justify-end">
                  <X
                    size={40}
                    className="cursor-pointer text-[#227369]/80 hover:text-[#227369]"
                    onClick={() => setShow(false)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="sailec-bold text-2xl lg:text-6xl text-[#0B2A26]">Capiz Nativity Decor</h1>
                  <h1 className="sailec-regular text-[#52726E] lg:text-[23px] lg:w-2/3">Handcrafted capiz nativity decor. A timeless accent for any space.</h1>
                </div>

                <div className="mt-5 lg:mt-[49.25px] flex flex-col gap-[30px]">
                  <div className="flex gap-2 items-center">
                    <div>
                      <BrickWall 
                        size={30}
                        className="text-[#227369]"
                      />
                    </div>
                    <div>
                      <h1 className="lg:text-[22px] text-[#52726E] sailec-regular">Capiz, brass wire, brass sheet</h1>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Palette 
                        size={30}
                        className="text-[#227369]"
                      />
                    </div>
                    <div>
                      <h1 className="lg:text-[22px] text-[#52726E] sailec-regular">Smoked, antique-plated</h1>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Shapes 
                        size={30}
                        className="text-[#227369]"
                      />
                    </div>
                    <div>
                      <h1 className="lg:text-[22px] text-[#52726E] sailec-regular">Nativity with 2 animals</h1>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <RulerDimensionLine 
                        size={30}
                        className="text-[#227369]"
                      />
                    </div>
                    <div>
                      <h1 className="lg:text-[22px] text-[#52726E] sailec-regular">16 cm L x 5 cm W x 13 cm H</h1>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Weight 
                        size={30}
                        className="text-[#227369]"
                      />
                    </div>
                    <div>
                      <h1 className="lg:text-[22px] text-[#52726E] sailec-regular">57 grams</h1>
                    </div>
                  </div>
                </div>

                <div className="mt-[22px] md:hidden">
                  <h1 className="bg-[#52726E] text-white rounded-full text-center sailec-regular w-full" onClick={() => setShow(false)}>Close</h1>
                </div>


              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Try;
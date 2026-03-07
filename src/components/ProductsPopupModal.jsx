'use client'
import React, {useEffect} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  BrickWall,
  Palette,
  Shapes,
  RulerDimensionLine,
  Weight,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function ProductsPopupModal({
  show,
  setShow,
  image,
  title,
  description,
}) {

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.22 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.18 },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.96,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.96,
      transition: {
        duration: 0.18,
      },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-30 md:z-20 bg-black/40"
          variants={backdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          onClick={() => setShow(false)}
        >
          <div className="flex justify-center items-center min-h-screen px-4 py-6">
            <motion.div
              className="bg-[#EEF6E8] w-full max-w-[1200px] flex flex-col md:flex-row md:justify-between rounded-[16.2px] gap-2 lg:gap-[49px] overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image section */}
              <div className="relative w-full md:w-1/2 h-[260px] sm:h-[320px] md:h-auto md:min-h-[720px] bg-white">
                <Image
                  src={image}
                  alt={title || "product image"}
                  fill
                  className="object-contain"
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
                  <h1 className="sailec-bold text-2xl md:text-6xl text-[#0B2A26]">
                    {title}
                  </h1>
                  <h1 className="sailec-regular text-[#52726E] md:text-[23px] lg:w-2/3">
                    {description}
                  </h1>
                </div>

                <div className="mt-5 md:mt-[49.25px] flex flex-col gap-[30px]">
                  <div className="flex gap-2 items-center">
                    <Tooltip>
                        <TooltipTrigger>
                            <BrickWall size={30} className="text-[#227369]" />
                        </TooltipTrigger>
                        <TooltipContent side={"bottom"}>
                            <h1 className="sailec-regular">Material</h1>
                        </TooltipContent>
                    </Tooltip>
                    <h1 className="md:text-[22px] text-[#52726E] sailec-regular">
                      Capiz, brass wire, brass sheet
                    </h1>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Tooltip>
                        <TooltipTrigger>
                            <Palette size={30} className="text-[#227369]" />
                        </TooltipTrigger>
                        <TooltipContent side={"bottom"}>
                            <h1 className="sailec-regular">Material</h1>
                        </TooltipContent>
                    </Tooltip>
                    <h1 className="md:text-[22px] text-[#52726E] sailec-regular">
                      Smoked, antique-plated
                    </h1>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Tooltip>
                        <TooltipTrigger>
                            <Shapes size={30} className="text-[#227369]" />
                        </TooltipTrigger>
                        <TooltipContent side={"bottom"}>
                            <h1 className="sailec-regular">Material</h1>
                        </TooltipContent>
                    </Tooltip>
                    <h1 className="md:text-[22px] text-[#52726E] sailec-regular">
                      Nativity with 2 animals
                    </h1>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Tooltip>
                        <TooltipTrigger>
                            <RulerDimensionLine size={30} className="text-[#227369]" />
                        </TooltipTrigger>
                        <TooltipContent side={"bottom"}>
                            <h1 className="sailec-regular">Material</h1>
                        </TooltipContent>
                    </Tooltip>
                    <h1 className="md:text-[22px] text-[#52726E] sailec-regular">
                      16 cm L x 5 cm W x 13 cm H
                    </h1>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Tooltip>
                        <TooltipTrigger>
                            <Weight size={30} className="text-[#227369]" />
                        </TooltipTrigger>
                        <TooltipContent side={"bottom"}>
                            <h1 className="sailec-regular">Material</h1>
                        </TooltipContent>
                    </Tooltip>
                    <h1 className="md:text-[22px] text-[#52726E] sailec-regular">
                      57 grams
                    </h1>
                  </div>
                </div>

                <div className="mt-[22px] md:hidden">
                  <button
                    type="button"
                    className="bg-[#52726E] text-white rounded-full text-center sailec-regular w-full py-2"
                    onClick={() => setShow(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProductsPopupModal;
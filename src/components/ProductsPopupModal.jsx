'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import {
  X,
  BrickWall,
  Palette,
  Shapes,
  RulerDimensionLine,
  Weight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

function ProductsPopupModal({
  show,
  setShow,
  media = [],
  title,
  description,
  material,
  color,
  shape,
  size,
  weight
}) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
      setCurrentMediaIndex(0)
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [show])

  const currentMedia = media?.[currentMediaIndex]

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
  }

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
        type: 'spring',
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
  }

  const productDetails = [
    {
      icon: <BrickWall size={26} className="text-[#227369] sm:size-[28px]" />,
      label: 'Material',
      value: material,
    },
    {
      icon: <Palette size={26} className="text-[#227369] sm:size-[28px]" />,
      label: 'Color',
      value: color,
    },
    {
      icon: <Shapes size={26} className="text-[#227369] sm:size-[28px]" />,
      label: 'Shape',
      value: shape,
    },
    {
      icon: <RulerDimensionLine size={26} className="text-[#227369] sm:size-[28px]" />,
      label: 'Size',
      value: size,
    },
    {
      icon: <Weight size={26} className="text-[#227369] sm:size-[28px]" />,
      label: 'Weight',
      value: weight,
    },
  ]

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50"
          variants={backdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          onClick={() => setShow(false)}
        >
          <div className="flex min-h-dvh items-center justify-center px-3 py-3 sm:px-6 sm:py-6 lg:px-8">
            <motion.div
              className="relative w-full max-w-[420px] overflow-hidden rounded-[18px] bg-[#EEF6E8] shadow-xl max-h-[calc(100dvh-24px)] sm:max-w-[720px] sm:max-h-[calc(100vh-48px)] md:max-w-[860px] lg:max-w-6xl lg:max-h-[90vh]"
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex max-h-[calc(100dvh-24px)] flex-col overflow-y-auto lg:grid lg:max-h-[90vh] lg:grid-cols-2 lg:overflow-hidden">
                <button
                  type="button"
                  className="absolute right-3 top-3 z-20 rounded-full bg-white/85 p-1 text-[#227369] transition hover:text-[#0B2A26] lg:hidden"
                  onClick={() => setShow(false)}
                >
                  <X size={28} />
                </button>

                <div className="relative h-[230px] shrink-0 w-full bg-white sm:h-[340px] md:h-[420px] lg:h-auto lg:min-h-[620px]">
                  {currentMedia ? (
                    <>
                      <AnimatePresence mode="wait">
                        {currentMedia.type === 'video' ? (
                          <motion.video
                            key={currentMedia.url}
                            src={currentMedia.url}
                            controls
                            className="h-full w-full object-contain p-4 sm:p-6 lg:p-8"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                          />
                        ) : (
                          <motion.div
                            key={currentMedia.url}
                            className="relative h-full w-full"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                          >
                            <Image
                              src={currentMedia.url}
                              alt={title || 'product image'}
                              fill
                              className="object-contain p-4 sm:p-6 lg:p-8"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              priority
                              unoptimized
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {media.length > 1 && (
                        <>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.08, x: -2 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => {
                              setCurrentMediaIndex((prev) =>
                                prev === 0 ? media.length - 1 : prev - 1
                              )
                            }}
                            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-2 shadow-md transition hover:bg-[#DDE58F]"
                          >
                            <ChevronLeft size={28} className="text-[#0B2A26]" />
                          </motion.button>

                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.08, x: 2 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => {
                              setCurrentMediaIndex((prev) =>
                                prev === media.length - 1 ? 0 : prev + 1
                              )
                            }}
                            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-2 shadow-md transition hover:bg-[#DDE58F]"
                          >
                            <ChevronRight size={28} className="text-[#0B2A26]" />
                          </motion.button>

                          <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white sailec-regular">
                            {currentMediaIndex + 1} / {media.length}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-[#D8D3D3] text-[24px] sailec-regular">
                        No Media
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col p-4 sm:p-6 lg:max-h-[90vh] lg:overflow-y-auto lg:p-8 xl:p-10">
                  <div className="hidden lg:flex justify-end">
                    <button
                      type="button"
                      className="text-[#227369]/80 transition hover:text-[#227369]"
                      onClick={() => setShow(false)}
                    >
                      <X size={34} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h1 className="sailec-bold text-[28px] leading-tight text-[#0B2A26] sm:text-[36px] md:text-[44px] xl:text-[56px]">
                      {title}
                    </h1>

                    <p className="sailec-regular text-[15px] leading-relaxed text-[#52726E] sm:text-[17px] lg:max-w-[90%] xl:text-[22px]">
                      {description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-5 sm:mt-8 sm:gap-6 lg:mt-10">
                    {productDetails.filter(val => val.value != null).map((detail) => {
                      return(
                      <div key={detail.label} className="flex items-start gap-3">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="mt-0.5 shrink-0"
                              aria-label={detail.label}
                            >
                              {detail.icon}
                            </button>
                          </TooltipTrigger>

                          <TooltipContent side="bottom">
                            <p className="sailec-regular">{detail.label}</p>
                          </TooltipContent>
                        </Tooltip>

                        <p className="sailec-regular text-[15px] leading-relaxed text-[#52726E] sm:text-[16px] lg:text-[20px] xl:text-[22px]">
                          {detail.value}
                        </p>
                      </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProductsPopupModal
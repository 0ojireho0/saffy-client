'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Grid3X3,
  Palette,
  Shapes,
  Ruler,
  Weight,
  Trash2,
  Pencil,
  Star,
  Tag,
  FolderDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { isProd } from '@/lib/axios'

import DeleteProductModal from '@/components/Admin/Galleries/DeleteModal'
import DeleteSuccessModal from '@/components/Admin/Galleries/DeleteSuccessModal'
import FeatureProductModal from '@/components/Admin/Galleries/FeaturedProduct'
import useGalleries from '@/hooks/Admin/useGalleries'
import FeatureSuccessModal from '@/components/Admin/Galleries/FeaturedSuccessModal'
import UnfeatureProductModal from '@/components/Admin/Galleries/UnfeatureProduct'
import UnfeatureSuccessModal from '@/components/Admin/Galleries/UnfeatureSuccessModal'
import ArchiveProductModal from '@/components/Admin/Galleries/ArchiveModal'
import ArchiveSuccessModal from '@/components/Admin/Galleries/ArchiveSuccessModal'
import UnarchiveProductModal from '@/components/Admin/Galleries/UnarchiveModal'
import UnarchiveSuccessModal from '@/components/Admin/Galleries/UnarchiveSuccessModal'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

function SearchedProduct({ product }) {
  const {
    DeleteGallery,
    FeatureGallery,
    UnfeatureGallery,
    ArchiveGallery,
    UnarchiveGallery,
  } = useGalleries()

  const router = useRouter()

  const item = product?.item || product

  const baseUrl = isProd
    ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API
    : process.env.NEXT_PUBLIC_BACKEND_API

  const mediaItems = item?.media?.length
    ? item.media
    : item?.img_path
      ? [
          {
            media_path: item.img_path,
            media_type: 'image',
          },
        ]
      : []

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const currentMedia = mediaItems[currentMediaIndex]

  const currentMediaUrl = currentMedia?.media_path
    ? `${baseUrl}/storage/${currentMedia.media_path}`
    : ''

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [unArchiveOpen, setUnarchiveOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [successArchiveOpen, setSuccessArchiveOpen] = useState(false)
  const [successUnarchiveOpen, setSuccessUnarchiveOpen] = useState(false)
  const [featureModalOpen, setFeatureModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successFeatureOpen, setSuccessFeatureOpen] = useState(false)
  const [unfeatureModalOpen, setUnfeatureModalOpen] = useState(false)
  const [successUnfeatureOpen, setSuccessUnfeatureOpen] = useState(false)

  const categoriesList = [
    {
      name: 'FASHION',
      value: 'fashion',
    },
    {
      name: 'GIFTS & PACKAGING',
      value: 'gifts',
    },
    {
      name: 'HOME & GARDEN',
      value: 'home',
    },
    {
      name: 'KITCHEN & DINING',
      value: 'kitchen',
    },
    {
      name: 'STATIONARIES & DESK ACCESSORIES',
      value: 'stationaries',
    },
    {
      name: 'SUPPORTED COMMUNITIES (GBP PRODUCTS)',
      value: 'supported',
    },
    {
      name: 'CHRISTMAS & HOLIDAYS',
      value: 'christmas',
    },
    {
      name: 'TOYS & GAMES',
      value: 'toys',
    },
  ]

  const getCategoryName = (value) => {
    return categoriesList.find((c) => c.value === value)?.name || value
  }

  const handleDelete = async () => {
    setLoading(true)

    await DeleteGallery({
      id: item?.id,
      onSuccess: () => {
        setDeleteOpen(false)
        setSuccessOpen(true)
      },
    })

    setLoading(false)
  }

  const handleArchive = async () => {
    setLoading(true)

    await ArchiveGallery({
      id: item?.id,
      onSuccess: () => {
        setArchiveOpen(false)
        setSuccessArchiveOpen(true)
      },
    })

    setLoading(false)
  }

  const handleUnarchive = async () => {
    setLoading(true)

    await UnarchiveGallery({
      id: item?.id,
      onSuccess: () => {
        setUnarchiveOpen(false)
        setSuccessUnarchiveOpen(true)
      },
    })

    setLoading(false)
  }

  const handleFeatureProduct = async () => {
    setLoading(true)

    await FeatureGallery({
      id: item?.id,
      onSuccess: () => {
        setFeatureModalOpen(false)
        setSuccessFeatureOpen(true)
      },
    })

    setLoading(false)
  }

  const handleUnfeatureProduct = async () => {
    setLoading(true)

    await UnfeatureGallery({
      id: item?.id,
      onSuccess: () => {
        setUnfeatureModalOpen(false)
        setSuccessUnfeatureOpen(true)
      },
    })

    setLoading(false)
  }

  const handleEditPage = () => {
    router.push(`/admin/gallery/edit/${item?.id}`)
  }

  return (
    <>
      <motion.div
        className="w-full max-w-[1180px] mx-auto py-2"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          className="flex justify-end items-center gap-[18px] mb-[28px]"
          variants={fadeUp}
          custom={0}
        >
          {/* 
          <motion.button
            type="button"
            onClick={() => setDeleteOpen(true)}
            whileHover={{ y: -2, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="h-10 w-10 rounded-full bg-[#F21B16] flex items-center justify-center cursor-pointer"
          >
            <Trash2 size={18} className="text-white" />
          </motion.button>
          */}

          {item?.isArchive ? (
            <motion.button
              type="button"
              onClick={() => setUnarchiveOpen(true)}
              whileHover={{ y: -2, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="h-10 w-10 rounded-full bg-[#FEEEEE] flex items-center justify-center cursor-pointer"
            >
              <FolderDown size={18} className="text-[#E01D10]" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={() => setArchiveOpen(true)}
              whileHover={{ y: -2, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="h-10 w-10 rounded-full bg-[#E01D10] flex items-center justify-center cursor-pointer"
            >
              <FolderDown size={18} className="text-white" />
            </motion.button>
          )}

          <motion.button
            type="button"
            whileHover={{ y: -2, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="h-10 w-10 rounded-full bg-[#227369] flex items-center justify-center cursor-pointer"
            onClick={handleEditPage}
          >
            <Pencil size={18} className="text-white" />
          </motion.button>

          {item?.isFeatured ? (
            <motion.button
              type="button"
              onClick={() => setUnfeatureModalOpen(true)}
              whileHover={{ y: -2, scale: 1.08, rotate: -4 }}
              whileTap={{ scale: 0.94 }}
              className="h-10 w-10 rounded-full bg-[#FFFADB] flex items-center justify-center cursor-pointer"
            >
              <Star size={18} className="text-[#FBA23D]" fill="#FBA23D" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={() => setFeatureModalOpen(true)}
              whileHover={{ y: -2, scale: 1.08, rotate: 4 }}
              whileTap={{ scale: 0.94 }}
              className="h-10 w-10 rounded-full bg-[#FFA43A] flex items-center justify-center cursor-pointer"
            >
              <Star size={18} className="text-white" fill="white" />
            </motion.button>
          )}
        </motion.div>

        <motion.div
          className="w-full rounded-[18px] bg-[#F1F1F1] p-[30px] sm:p-[46px]"
          variants={fadeUp}
          custom={0.1}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <motion.div
              className="relative bg-white rounded-l-[12px] overflow-hidden min-h-[360px] lg:min-h-[640px] flex items-center justify-center"
              variants={fadeUp}
              custom={0.18}
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.25 }}
            >
              {currentMediaUrl ? (
                <>
                  <AnimatePresence mode="wait">
                    {currentMedia?.media_type === 'video' ? (
                      <motion.video
                        key={currentMediaUrl}
                        src={currentMediaUrl}
                        controls
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                      />
                    ) : (
                      <motion.img
                        key={currentMediaUrl}
                        src={currentMediaUrl}
                        alt={item?.title || 'Product media'}
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </AnimatePresence>

                  {mediaItems.length > 1 && (
                    <>
                      <motion.button
                        type="button"
                        onClick={() => {
                          setCurrentMediaIndex((prev) =>
                            prev === 0 ? mediaItems.length - 1 : prev - 1
                          )
                        }}
                        whileHover={{ scale: 1.08, x: -2 }}
                        whileTap={{ scale: 0.94 }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-[#DDE58F] rounded-full p-2 shadow-md z-10 transition-all duration-200 cursor-pointer"
                      >
                        <ChevronLeft size={28} className="text-[#0B2A26]" />
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => {
                          setCurrentMediaIndex((prev) =>
                            prev === mediaItems.length - 1 ? 0 : prev + 1
                          )
                        }}
                        whileHover={{ scale: 1.08, x: 2 }}
                        whileTap={{ scale: 0.94 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-[#DDE58F] rounded-full p-2 shadow-md z-10 transition-all duration-200 cursor-pointer"
                      >
                        <ChevronRight size={28} className="text-[#0B2A26]" />
                      </motion.button>

                      <motion.div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full sailec-regular"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {currentMediaIndex + 1} / {mediaItems.length}
                      </motion.div>
                    </>
                  )}
                </>
              ) : (
                <motion.p
                  className="text-[#D8D3D3] text-[24px] sailec-regular"
                  variants={fadeIn}
                >
                  No Media
                </motion.p>
              )}
            </motion.div>

            <motion.div
              className="bg-[#EEF6E8] px-[40px] py-[30px] flex flex-col justify-center text-left"
              variants={fadeUp}
              custom={0.24}
            >
              <motion.h2
                className="text-[#0B2A26] text-[42px] sm:text-[54px] leading-tight sailec-bold mb-[12px]"
                variants={fadeUp}
                custom={0.28}
              >
                {item?.title || 'Untitled Product'}
              </motion.h2>

              <motion.p
                className="text-[#52726E] text-[18px] sm:text-[20px] leading-[1.25] sailec-regular mb-[48px] max-w-[420px]"
                variants={fadeUp}
                custom={0.32}
              >
                {item?.description || 'No description available.'}
              </motion.p>

              <motion.div
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <InfoRow icon={<Grid3X3 />} label="Material" value={item?.material} />
                <InfoRow icon={<Palette />} label="Color" value={item?.color} />
                <InfoRow icon={<Shapes />} label="Shape" value={item?.shape} />
                <InfoRow icon={<Ruler />} label="Size" value={item?.size} />
                <InfoRow icon={<Weight />} label="Weight" value={item?.weight} />
                <InfoRow icon={<Tag />} label="Category" value={getCategoryName(item?.category)} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* 
      <DeleteProductModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
        loading={loading}
      /> 
      */}

      <ArchiveProductModal
        open={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        onDelete={handleArchive}
        loading={loading}
      />

      <UnarchiveProductModal
        open={unArchiveOpen}
        onClose={() => setUnarchiveOpen(false)}
        onDelete={handleUnarchive}
        loading={loading}
      />

      <DeleteSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
      />

      <ArchiveSuccessModal
        open={successArchiveOpen}
        onClose={() => setSuccessArchiveOpen(false)}
      />

      <UnarchiveSuccessModal
        open={successUnarchiveOpen}
        onClose={() => setSuccessUnarchiveOpen(false)}
      />

      <FeatureSuccessModal
        open={successFeatureOpen}
        onClose={() => setSuccessFeatureOpen(false)}
      />

      <FeatureProductModal
        open={featureModalOpen}
        onClose={() => setFeatureModalOpen(false)}
        onFeature={handleFeatureProduct}
        loading={loading}
      />

      <UnfeatureProductModal
        open={unfeatureModalOpen}
        onClose={() => setUnfeatureModalOpen(false)}
        onFeature={handleUnfeatureProduct}
        loading={loading}
      />

      <UnfeatureSuccessModal
        open={successUnfeatureOpen}
        onClose={() => setSuccessUnfeatureOpen(false)}
      />
    </>
  )
}

function InfoRow({ icon, value, label }) {
  if (!value) return null

  return (
    <Tooltip>
      <motion.div
        className="flex items-center gap-[20px] text-[#167C71]"
        variants={fadeUp}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <TooltipTrigger asChild>
          {React.cloneElement(icon, {
            size: 34,
            strokeWidth: 2.2,
            className: 'shrink-0',
          })}
        </TooltipTrigger>

        <TooltipContent side="bottom">
          <p className="sailec-regular">{label}</p>
        </TooltipContent>

        <p className="text-[#52726E] text-[18px] sm:text-[20px] sailec-regular">
          {value}
        </p>
      </motion.div>
    </Tooltip>
  )
}

export default SearchedProduct
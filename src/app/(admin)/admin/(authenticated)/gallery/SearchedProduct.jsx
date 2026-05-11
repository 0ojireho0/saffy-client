'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  FolderDown
} from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


import { isProd } from '@/lib/axios'

import DeleteProductModal from '@/components/Admin/Galleries/DeleteModal'
import DeleteSuccessModal from '@/components/Admin/Galleries/DeleteSuccessModal'
import FeatureProductModal from '@/components/Admin/Galleries/FeaturedProduct'
import useGalleries from '@/hooks/Admin/useGalleries'
import FeatureSuccessModal from '@/components/Admin/Galleries/FeaturedSuccessModal'
import UnfeatureProductModal from '@/components/Admin/Galleries/UnfeatureProduct'
import UnfeatureSuccessModal from '@/components/Admin/Galleries/UnfeatureSuccessModal'
import ArchiveProductModal from '@/components/Admin/Galleries/ArchiveModal';
import ArchiveSuccessModal from '@/components/Admin/Galleries/ArchiveSuccessModal';
import UnarchiveProductModal from '@/components/Admin/Galleries/UnarchiveModal';
import UnarchiveSuccessModal from '@/components/Admin/Galleries/UnarchiveSuccessModal';

function SearchedProduct({ product }) {
  const { DeleteGallery, FeatureGallery, UnfeatureGallery, ArchiveGallery, UnarchiveGallery } = useGalleries()
  const router = useRouter()

  const item = product?.item || product

  const imageUrl = item?.img_path
    ? `${
        isProd
          ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API
          : process.env.NEXT_PUBLIC_BACKEND_API
      }/storage/${item.img_path}`
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

  const handleArchive = async() => {
    setLoading(true)

    await ArchiveGallery({
      id: item?.id,
      onSuccess: () => {
        setArchiveOpen(false)
        setSuccessArchiveOpen(true)
      }
    })
    setLoading(false)
  }

  const handleUnarchive = async() => {
    setLoading(true)

    await UnarchiveGallery({
      id: item?.id,
      onSuccess: () => {
        setUnarchiveOpen(false)
        setSuccessUnarchiveOpen(true)
      }
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

  const handleUnfeatureProduct = async() => {
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
      <div className="w-full max-w-[1180px] mx-auto py-2">
        <div className="flex justify-end items-center gap-[18px] mb-[28px]">
          {/* <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="h-10 w-10 rounded-full bg-[#F21B16] flex items-center justify-center cursor-pointer"
          >
            <Trash2 size={18} className="text-white" />
          </button> */}
          {item?.isArchive ? (
            <>
          <button
            type="button"
            onClick={() => setUnarchiveOpen(true)}
            className="h-10 w-10 rounded-full bg-[#FEEEEE] flex items-center justify-center cursor-pointer"
          >
            <FolderDown size={18} className="text-[#E01D10]" />
          </button>
            </>
          ) : (
            <>
          <button
            type="button"
            onClick={() => setArchiveOpen(true)}
            className="h-10 w-10 rounded-full bg-[#E01D10] flex items-center justify-center cursor-pointer"
          >
            <FolderDown size={18} className="text-white" />
          </button>
            </>
          )}

          <button
            type="button"
            className="h-10 w-10 rounded-full bg-[#227369] flex items-center justify-center cursor-pointer"
            onClick={handleEditPage}
          >
            <Pencil size={18} className="text-white" />
          </button>

          {item?.isFeatured ? (
            <>
            <button
              type="button"
              onClick={() => setUnfeatureModalOpen(true)}
              className="h-10 w-10 rounded-full bg-[#FFFADB] flex items-center justify-center cursor-pointer"
            >
              <Star size={18} className="text-[#FBA23D]" fill="#FBA23D" />
            </button>
            </>
          ) : (
            <>
            <button
              type="button"
              onClick={() => setFeatureModalOpen(true)}
              className="h-10 w-10 rounded-full bg-[#FFA43A] flex items-center justify-center cursor-pointer"
            >
              <Star size={18} className="text-white" fill="white" />
            </button>
            </>
          )}
        </div>

        <div className="w-full rounded-[18px] bg-[#F1F1F1] p-[30px] sm:p-[46px]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-white rounded-l-[12px] overflow-hidden min-h-[360px] lg:min-h-[640px] flex items-center justify-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item?.title || 'Product image'}
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="text-[#D8D3D3] text-[24px] sailec-regular">
                  No Image
                </p>
              )}
            </div>

            <div className="bg-[#EEF6E8] px-[40px] py-[30px] flex flex-col justify-center text-left">
              <h2 className="text-[#0B2A26] text-[42px] sm:text-[54px] leading-tight sailec-bold mb-[12px]">
                {item?.title || 'Untitled Product'}
              </h2>

              <p className="text-[#52726E] text-[18px] sm:text-[20px] leading-[1.25] sailec-regular mb-[48px] max-w-[420px]">
                {item?.description || 'No description available.'}
              </p>

              <div className="space-y-6">
                <InfoRow icon={<Grid3X3 />} label="Material" value={item?.material} />
                <InfoRow icon={<Palette />} label="Color" value={item?.color} />
                <InfoRow icon={<Shapes />} label="Shape" value={item?.shape} />
                <InfoRow icon={<Ruler />} label="Size" value={item?.size} />
                <InfoRow icon={<Weight />} label="Weight" value={item?.weight} />
                <InfoRow
                  icon={<Tag />}
                  value={getCategoryName(item?.category)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <DeleteProductModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
        loading={loading}
      /> */}

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
      <div className="flex items-center gap-[20px] text-[#167C71]">
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
      </div>
    </Tooltip>
  )
}

export default SearchedProduct
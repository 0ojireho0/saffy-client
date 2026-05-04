import React, { useState } from 'react'
import {
  Grid3X3,
  Palette,
  Shapes,
  Ruler,
  Weight,
  Trash2,
  Pencil,
  Star,
  Tag
} from 'lucide-react'

import { isProd } from '@/lib/axios'

import DeleteProductModal from '@/components/Admin/Galleries/DeleteModal'
import DeleteSuccessModal from '@/components/Admin/Galleries/DeleteSuccessModal'
import useGalleries from '@/hooks/Admin/useGalleries'

function SearchedProduct({ product }) {

    const { DeleteGallery } = useGalleries()
    const item = product?.item || product

    const imageUrl = `${isProd ? `${process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API}/storage/${item.img_path}` : `${process.env.NEXT_PUBLIC_BACKEND_API}/storage/${item.img_path}`}`

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const categoriesList = [
        {
        name: "FASHION",
        value: "fashion"
        },
        {
        name: "GIFTS & PACKAGING",
        value: "gifts"
        },
        {
        name: "HOME & GARDEN",
        value: "home"
        },
        {
        name: "KITCHEN & DINING",
        value: "kitchen"
        },
        {
        name: "STATIONARIES & DESK ACCESSORIES",
        value: "stationaries"
        },
        {
        name: "SUPPORTED COMMUNITIES (GBP PRODUCTS)",
        value: "supported"
        },
        {
        name: "CHRISTMAS & HOLIDAYS",
        value: "christmas"
        },
        {
        name: "TOYS & GAMES",
        value: "toys"
        },
    ]

    const getCategoryName = (value) => {
        return categoriesList.find(c => c.value === value)?.name || value
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


  return (
    <>
    <div className="w-full max-w-[1180px] mx-auto py-2">
      <div className="flex justify-end items-center gap-[18px] mb-[28px]">
        <button
        type="button"
        onClick={() => setDeleteOpen(true)}
        className="h-10 w-10 rounded-full bg-[#F21B16] flex items-center justify-center"
        >
        <Trash2 size={18} className="text-white" />
        </button>

        <button className="h-10 w-10 rounded-full bg-[#227369] flex items-center justify-center">
          <Pencil size={18} className="text-white" />
        </button>

        <button className="h-10 w-10 rounded-full bg-[#FFA43A] flex items-center justify-center">
          <Star size={18} className="text-white" fill="white" />
        </button>
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
              <InfoRow icon={<Grid3X3 />} value={item?.material} />
              <InfoRow icon={<Palette />} value={item?.color} />
              <InfoRow icon={<Shapes />} value={item?.shape} />
              <InfoRow icon={<Ruler />} value={item?.size} />
              <InfoRow icon={<Weight />} value={item?.weight} />
              <InfoRow icon={<Tag />} value={getCategoryName(item?.category)}  />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center mt-10">
        <button className="bg-[#DDE58F] px-[24px] py-[9px] rounded-full text-[#0B2A26] text-[14px] sailec-bold">
          CONFIRM
        </button>
      </div> */}
    </div>

    <DeleteProductModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
        loading={loading}
    />

    <DeleteSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
    />
        
    
    </>
  )
}

function InfoRow({ icon, value }) {
  if (!value) return null

  return (
    <div className="flex items-center gap-[20px] text-[#167C71]">
      {React.cloneElement(icon, {
        size: 34,
        strokeWidth: 2.2,
        className: 'shrink-0',
      })}

      <p className="text-[#52726E] text-[18px] sm:text-[20px] sailec-regular">
        {value}
      </p>
    </div>
  )
}

export default SearchedProduct
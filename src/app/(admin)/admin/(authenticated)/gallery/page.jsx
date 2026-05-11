'use client'
import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import useGalleries from '@/hooks/Admin/useGalleries'
import { MoonLoader } from 'react-spinners'
import SearchedProduct from './SearchedProduct'
import { useAuth } from '@/hooks/auth'


export default function Gallery() {

  useAuth({
    middleware: 'auth',
  })

  const router = useRouter()

  const [search, setSearch] = useState('')
  const [debounceSearch, setDebounceSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const { products, isLoading } = useGalleries({
    search: debounceSearch
  })

  const handleAddProduct = () => {
    router.push('/admin/gallery/add')
  }

  useEffect(() => {
    if (!search) {
      setDebounceSearch("");
      return;
    }

    const handler = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  return (
    <div className=" w-full bg-white px-5 sm:px-8 lg:px-0">
      <div className="w-full flex items-center justify-center">
        <h1 className="helvetica-bold text-[#0B2A26] text-[26px] sm:text-[32px] pt-[40px] sm:pt-[53px] pb-[40px] sm:pb-[60px]">
          GALLERY
        </h1>
      </div>

      <div className="w-full max-w-[1180px] mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
        <div className="flex items-center gap-[10px] sm:gap-[14px] w-full md:max-w-[590px]">
          <Search
            size={32}
            strokeWidth={2.5}
            className="text-[#167C71] shrink-0 w-[26px] h-[26px] sm:w-[32px] sm:h-[32px]"
          />

          <input
            type="text"
            placeholder="PRODUCT ID"
            className="w-full h-[42px] border border-[#167C71] rounded-[4px] px-[14px] sm:px-[16px]
                       text-[16px] sm:text-[18px] text-[#0B2A26] placeholder:text-[#9E9E9E]
                       outline-none focus:ring-1 focus:ring-[#167C71] helvetica-regular"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
 
          <Button 
              title={"ADD PRODUCT"}
              className={"bg-[#227369] text-white px-[20px] py-[12px] cursor-pointer"}
              onClick={handleAddProduct}
          />

      </div>

      <div className="w-full flex items-center justify-center mt-[38px] text-center px-4">
        {isLoading ? (
          <>
          <MoonLoader 
            size={100}
          />
          
          </>
        ) : products?.item ? (
          <>
          <SearchedProduct 
            product={products}
          />
          </>
        ) : debounceSearch ? (
          <>
          <p className="text-[#52726E] text-[18px] sm:text-[22px] lg:text-[24px] sailec-regular">Product not found</p>
          </>
        ) : (
          <>
          <p className="text-[#52726E] text-[18px] sm:text-[22px] lg:text-[24px] sailec-regular">Search a product to edit/delete</p>
          </>
        )}
      </div>
    </div>
  )
}
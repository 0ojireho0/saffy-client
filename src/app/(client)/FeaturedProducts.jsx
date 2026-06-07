'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import img1 from '@/assets/images/featured-products/img1.jpg'
import img2 from '@/assets/images/featured-products/img2.jpg'
import img3 from '@/assets/images/featured-products/img3.jpg'
import img4 from '@/assets/images/featured-products/img4.jpg'
import img5 from '@/assets/images/featured-products/img5.jpg'

import ProductsPopupModal from '@/components/ProductsPopupModal'
import Button from '@/components/Button'

import useFeaturedGallery from '@/hooks/Client/useFeaturedGallery'
import { isProd } from '@/lib/axios'
import Link from 'next/link'

function FeaturedProducts() {
  const { featuredGallery } = useFeaturedGallery()

  const backendUrl = isProd
    ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API
    : process.env.NEXT_PUBLIC_BACKEND_API

  const [showProductModal, setShowProductModal] = useState(false)

  const [getItemDesc, setGetItemDesc] = useState({
    media: [],
    title: '',
    description: '',
    material: '',
    color: '',
    shape: '',
    size: '',
    weight: '',
    product_id: ''
  })

  const featuredProductsList = [
    {
      id: 1,
      title: 'Capiz Nativity Decor',
      description: 'Handcrafted capiz nativity decor. A timeless accent for any space.',
      img: img1,
    },
    {
      id: 2,
      title: 'Sabutan Lady Hat',
      description: 'Woven sabutan hat with colorful detail. Lightweight and breathable.',
      img: img2,
    },
    {
      id: 3,
      title: 'Capiz Earrings',
      description: 'Capiz shell earrings with vibrant color. Lightweight and eye-catching.',
      img: img3,
    },
    {
      id: 4,
      title: 'Long Chopping Board',
      description: 'Solid wood chopping board. Durable and functional.',
      img: img4,
    },
    {
      id: 5,
      title: 'Laminated Capiz Square Coaster',
      description: 'Laminated capiz shell coaster. Protects surfaces in style.',
      img: img5,
    },
  ]

  const products =
    featuredGallery?.length > 0 ? featuredGallery : featuredProductsList

  const buildMediaUrl = (path) => {
    if (!path) return null

    if (typeof path !== 'string') {
      return path
    }

    if (path.startsWith('http')) {
      return path
    }

    if (path.startsWith('/storage')) {
      return `${backendUrl}${path}`
    }

    return `${backendUrl}/${path.replace(/^\/+/, '')}`
  }

  const getProductMedia = (product) => {
    if (product?.media?.length) {
      return product.media.map((media) => ({
        url: buildMediaUrl(
          media.media_url || media.media_path || media.url || media.path
        ),
        type: media.media_type || media.type || 'image',
      }))
    }

    if (product?.image) {
      return [
        {
          url: buildMediaUrl(product.image),
          type: 'image',
        },
      ]
    }

    if (product?.img_path) {
      return [
        {
          url: buildMediaUrl(`/storage/${product.img_path}`),
          type: 'image',
        },
      ]
    }

    return [
      {
        url: product.img,
        type: 'image',
      },
    ]
  }

  const showProductsModal = (item) => {
    const productMedia = getProductMedia(item)

    setShowProductModal(true)

    setGetItemDesc({
      media: productMedia,
      title: item.title || null,
      description: item.description || null,
      material: item.material || null,
      color: item.color || null,
      shape: item.shape || null,
      size: item.size || null,
      weight: item.weight || null,
      product_id: item.product_id || null
    })
  }

  const sectionFade = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 24 },
    },
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 24 },
    },
  }

  return (
    <>
      <motion.section
        className="w-full min-h-225.25 bg-[#E1F1D5]"
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="pt-12 md:pt-16 lg:pt-20 text-center px-4 md:px-10 lg:px-0">
          <h1 className="helvetica-bold text-[24px] md:text-[28px] lg:text-[32px]">
            FEATURED PRODUCTS
          </h1>

          <h1 className="mt-3 sailec-regular text-[#52726E] text-[18px] md:text-[22px] lg:text-[28px]">
            Discover products that reflects our purpose
          </h1>
        </div>

        <div className="mt-10 md:mt-12 lg:mt-15 px-4 md:px-10 lg:px-34.5">
          <div className="mx-auto w-full max-w-400">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 md:gap-6 lg:gap-9"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {products.map((item) => {
                const productMedia = getProductMedia(item)
                const imageUrl = productMedia[0]?.url

                return (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    className="flex flex-col items-center md:items-start"
                  >
                    <div
                      className="relative w-full aspect-[5/6] overflow-hidden rounded-[20px] group cursor-pointer"
                      onClick={() => showProductsModal(item)}
                    >
                      {productMedia[0]?.type === 'video' ? (
                        <video
                          src={imageUrl}
                          className="h-full w-full object-cover"
                          muted
                          playsInline
                        />
                      ) : (
                        <Image
                          src={imageUrl}
                          alt={item.title || 'Featured product'}
                          fill
                          unoptimized={typeof imageUrl === 'string'}
                          className="object-cover"
                          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 280px"
                        />
                      )}

                      <div className="absolute inset-0 flex items-center justify-center bg-black/48 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="sailec-bold text-[#E1F1D5] text-[16px]">
                          VIEW DETAILS
                        </span>
                      </div>
                    </div>

                    <h1 className="mt-4 md:mt-5 lg:mt-6 sailec-bold text-[22px] md:text-[23px] text-[#0B2A26] text-center md:text-left">
                      {item.title}
                    </h1>

                    <h1 className="mt-1.5 sailec-regular text-[14px] md:text-[16px] text-[#52726E] text-center md:text-left">
                      {item.description || item.desc}
                    </h1>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        <div className="py-15 text-center px-4">
            <Link
              href="/gallery"
              type="button"
            >
              <Button 
                title={"VIEW MORE PRODUCTS"}
                className={"bg-[#0B2B26] text-[#E1F1D5] transition-transform hover:scale-105 text-[16px] py-3 px-5 cursor-pointer"}
              />
            </Link>
        </div>
      </motion.section>

      <ProductsPopupModal
        setShow={setShowProductModal}
        show={showProductModal}
        media={getItemDesc.media}
        title={getItemDesc.title}
        description={getItemDesc.description}
        material={getItemDesc.material}
        color={getItemDesc.color}
        shape={getItemDesc.shape}
        size={getItemDesc.size}
        weight={getItemDesc.weight}
        product_id={getItemDesc.product_id}
      />
    </>
  )
}

export default FeaturedProducts
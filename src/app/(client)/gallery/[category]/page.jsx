'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

// Hooks
import useCategory from '@/hooks/Client/useCategory'

// Components
import Loading from '@/components/Loading'
import ProductsPopupModal from '@/components/ProductsPopupModal'

// Assets
import testImg from '@/assets/images/test-img.png'

// Motion
import { motion } from 'framer-motion'

// Helper
import { isProd } from '@/lib/axios'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
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

const productAnimation = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
}

const bannerAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function CategoryPage() {
  const params = useParams()
  const { category } = params

  const { categories, isLoading } = useCategory({
    category,
  })

  if (isLoading) {
    return <Loading />
  }

  // const categories = [
  //   {
  //     title: "Featured Products",
  //     products: [
  //       { name: "Capiz Earrings", image: testImg },
  //       { name: "Cala Earrings", image: testImg },
  //       { name: "Capiz Ear Ring", image: testImg },
  //       { name: "Capiz Ear Wings", image: testImg },
  //       { name: "Buri Phone Bag with Handle", image: testImg },
  //       { name: "Buri Envelope Bag", image: testImg },
  //       { name: "Buri Pouch Bag", image: testImg },
  //       { name: "Buri Packaging Bag Medium", image: testImg },
  //       { name: "Buri Functional Handbag", image: testImg },
  //       { name: "Capiz Earrings", image: testImg },
  //     ],
  //     viewProducts: false
  //   },
  // ];

  const categoryList = Array.isArray(categories)
    ? categories
    : categories
      ? [categories]
      : []

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1550px] bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative mb-10 flex items-center justify-center sm:mb-12"
      >
        <Link
          href="/gallery"
          className="absolute left-0 inline-flex items-center gap-1 tracking-wide text-[#227369] transition hover:opacity-80"
        >
          <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
            <ChevronLeft size={22} />
          </motion.span>

          <span className="text-[14px] sm:text-[16px] helvetica-regular">
            BACK
          </span>
        </Link>

        <h1 className="text-center text-base uppercase tracking-[0.12em] text-[#0B2A26] sm:text-lg helvetica-bold">
          Gallery
        </h1>
      </motion.div>

      {categoryList.length > 0 ? (
        categoryList.map((item) => (
          <CategorySection
            key={item.title}
            title={item.title}
            products={item.products || []}
          />
        ))
      ) : (
        <CraftBanner />
      )}
    </main>
  )
}

function CategorySection({ title, products = [] }) {

   

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mb-14 sm:mb-16"
    >
      <motion.h2
        variants={fadeUp}
        className="mb-7 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#0B2A26] sm:text-sm helvetica-regular"
      >
        {title}
      </motion.h2>

      {products.length <= 0 ? (
        <CraftBanner />
      ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 lg:gap-y-9"
          >
          {products.map((product, index) => (
            <ProductCard
              key={`${product.product_id || product.title}-${index}`}
              product={product}
            />
          ))}
        </motion.div>
      )}
    </motion.section>
  )
}

function ProductCard({ product }) {
  const backendUrl = isProd
    ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API
    : process.env.NEXT_PUBLIC_BACKEND_API

  const productMedia = product?.media?.length
    ? product.media.map((media) => ({
        url: media.media_url?.startsWith('/storage')
          ? `${backendUrl}${media.media_url}`
          : media.media_url || `${backendUrl}/storage/${media.media_path}`,
        type: media.media_type,
      }))
    : [
        {
          url: product?.image
            ? product.image.startsWith('/storage')
              ? `${backendUrl}${product.image}`
              : product.image
            : product?.img_path
              ? `${backendUrl}/storage/${product.img_path}`
              : testImg,
          type: 'image',
        },
      ]

  const firstMedia = productMedia[0]
  const imageUrl = firstMedia?.url || testImg

  const [getItemDesc, setGetItemDesc] = useState({
    media: [],
    title: '',
    description: '',
    material: '',
    color: '',
    shape: '',
    size: '',
    weight: '',
  })

  const [showProductModal, setShowProductModal] = useState(false)

  const showProductsModal = () => {
    setShowProductModal(true)

    setGetItemDesc({
      media: productMedia,
      title: product?.title || '',
      description: product?.description || '',
      material: product?.material || '',
      color: product?.color || '',
      shape: product?.shape || '',
      size: product?.size || '',
      weight: product?.weight || '',
    })
  }

  return (
    <>
      <motion.article
        variants={productAnimation}
        whileHover={{
          y: -6,
          transition: { duration: 0.2 },
        }}
        className="text-center cursor-pointer"
        onClick={showProductsModal}
      >
        <div className="mb-3 aspect-square">
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            className="relative h-full w-full overflow-hidden bg-white"
          >
            {firstMedia?.type === 'video' ? (
              <video
                src={imageUrl}
                className="h-full w-full object-cover"
                muted
                playsInline
              />
            ) : (
              <Image
                src={imageUrl}
                alt={product?.title || 'Gallery product'}
                className="object-cover"
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
            )}
          </motion.div>
        </div>

        <h3 className="mx-auto max-w-[150px] text-xs font-medium leading-snug text-[#0B2A26] sm:text-[13px] sailec-bold">
          {product?.title}
        </h3>
      </motion.article>

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
      />
    </>
  )
}

function CraftBanner() {
  return (
    <motion.section
      variants={bannerAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative mt-16 flex min-h-[90px] items-center justify-center overflow-hidden rounded bg-[#113c34] px-6 text-white sm:mt-18 sm:min-h-[150px]"
    >
      <motion.div
        animate={{
          rotate: [0, 8, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-16 -left-10 h-40 w-40 bg-[#294B3F] opacity-90 [clip-path:polygon(50%_0,62%_35%,100%_35%,68%_55%,82%_100%,50%_72%,18%_100%,32%_55%,0_35%,38%_35%)]"
      />

      <motion.div
        animate={{
          rotate: [0, -8, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -right-10 -top-16 h-40 w-40 bg-[#294B3F] opacity-90 [clip-path:polygon(50%_0,62%_35%,100%_35%,68%_55%,82%_100%,50%_72%,18%_100%,32%_55%,0_35%,38%_35%)]"
      />

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="relative z-10 text-center text-2xl font-bold uppercase tracking-[0.08em] sm:text-4xl lg:text-[42px] helvetica-regular"
      >
        Crafting Something New
      </motion.h2>
    </motion.section>
  )
}
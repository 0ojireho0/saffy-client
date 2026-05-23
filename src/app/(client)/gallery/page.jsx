'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


// Hooks
import useGallery from "@/hooks/Client/useGallery";

// Components
import Loading from "@/components/Loading";
import Button from "@/components/Button";
import ProductsPopupModal from '@/components/ProductsPopupModal';

// Assets
import testImg from "@/assets/images/test-img.png"

// Motion
import { motion } from "framer-motion";

// Helper
import { isProd } from "@/lib/axios";


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
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

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
      ease: "easeOut",
    },
  },
};

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
      ease: "easeOut",
    },
  },
};




function ProductCard({ product }) {
  const backendUrl = isProd
    ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API
    : process.env.NEXT_PUBLIC_BACKEND_API;

  const productMedia = product?.media?.length
    ? product.media.map((media) => ({
        url: media.media_url?.startsWith('/storage')
          ? `${backendUrl}${media.media_url}`
          : media.media_url || `${backendUrl}/storage/${media.media_path}`,
        type: media.media_type,
      }))
    : [
        {
          url: product.img_path
            ? `${backendUrl}/storage/${product.img_path}`
            : testImg,
          type: 'image',
        },
      ];

  const imageUrl = productMedia[0]?.url || testImg;

  const [getItemDesc, setGetItemDesc] = useState({
    media: [],
    title: '',
    description: '',
    material: '',
    color: '',
    shape: '',
    size: '',
    weight: ''
  });

  const [showProductModal, setShowProductModal] = useState(false);

  const showProductsModal = (product) => {
    setShowProductModal(true);

    setGetItemDesc({
      media: productMedia,
      title: product.title,
      description: product.description,
      material: product.material,
      color: product.color,
      shape: product.shape,
      size: product.size,
      weight: product.weight,
    });
  };

  return (
    <>
      <motion.article
        variants={productAnimation}
        whileHover={{
          y: -6,
          transition: { duration: 0.2 },
        }}
        className="text-center cursor-pointer"
        onClick={() => showProductsModal(product)}
      >
        <div className="mb-3 aspect-square">
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            className="relative h-full w-full overflow-hidden"
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
                alt={product.title || 'Gallery product'}
                className="object-cover"
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
            )}
          </motion.div>
        </div>

        <h3 className="mx-auto max-w-[150px] text-xs font-medium leading-snug text-[#0B2A26] sm:text-[13px] sailec-bold">
          {product.title}
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
  );
}

function CategorySection({ title, products, viewProducts, path }) {
  const router = useRouter();

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      className="mb-14 sm:mb-16"
    >
      <motion.h2
        variants={fadeUp}
        className="mb-7 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#0B2A26] sm:text-sm helvetica-regular"
      >
        {title}
      </motion.h2>

      {products.length < 1 ? (
        <CraftBanner />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 lg:gap-y-9"
        >
          {products.map((product, index) => (
            <ProductCard key={`${product.title}-${index}`} product={product} />
          ))}
        </motion.div>
      )}

      {viewProducts && (
        <motion.div
          variants={fadeUp}
          className="flex justify-center items-center"
        >
          <Button
            title="VIEW ALL PRODUCTS"
            className={"text-[#05251F] bg-[#E4E9A7] text-[16px] py-3 px-[16px] mt-7 sm:mt-10 cursor-pointer"}
            onClick={() => router.push(path)}
          />
        </motion.div>
      )}
    </motion.section>
  );
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
          ease: "easeInOut",
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
          ease: "easeInOut",
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
  );
}

function Gallery() {



  const { gallery, isLoading } = useGallery()

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="mx-auto w-full max-w-[1550px] bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mb-10 text-center text-base uppercase tracking-[0.12em] text-[#0B2A26] sm:mb-12 sm:text-lg helvetica-bold"
      >
        Gallery
      </motion.h1>

      {gallery.map((category) => (
        <CategorySection
          key={category.title}
          title={category.title}
          products={category.products}
          viewProducts={category.viewProducts}
          path={category.path}
        />
      ))}
    </main>
  );
}

export default Gallery;
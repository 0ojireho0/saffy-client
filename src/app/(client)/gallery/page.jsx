'use client'
import React from "react";
import testImg from "@/assets/images/test-img.png"
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

const categories = [
  {
    title: "Featured Products",
    products: [
      { name: "Capiz Earrings", image: testImg },
      { name: "Cala Earrings", image: testImg },
      { name: "Capiz Ear Ring", image: testImg },
      { name: "Capiz Ear Wings", image: testImg },
      { name: "Buri Phone Bag with Handle", image: testImg },
      { name: "Buri Envelope Bag", image: testImg },
      { name: "Buri Pouch Bag", image: testImg },
      { name: "Buri Packaging Bag Medium", image: testImg },
      { name: "Buri Functional Handbag", image: testImg },
      { name: "Capiz Earrings", image: testImg },
    ],
    viewProducts: false
  },
  {
    title: "Fashion",
    products: [
      { name: "Raffia Fan", image: testImg },
      { name: "Santan Fan", image: testImg },
      { name: "Buri Woven Keychain", image: testImg },
      { name: "Abaca Scrunchie", image: testImg },
      { name: "Abaca Tissue Pack Holder", image: testImg },
      { name: "Wood Bookmark", image: testImg },
      { name: "Buri Giraffe Keychain", image: testImg },
      { name: "Baluhan Fan", image: testImg },
    ],
    viewProducts: true,
    path: "/gallery/fashion"
  },
  {
    title: "Gift & Packaging",
    products: [
      { name: "Koala Planter", image: testImg },
      { name: "Bamboo Tube Chime", image: testImg },
      { name: "Acacia Wood Candle Holder", image: testImg },
      { name: "Rattan Fan Wreath Small", image: testImg },
      { name: "Capiz Sun Bird Hanging Ornament", image: testImg },
      { name: "Capiz Butterfly Hanging Ornament", image: testImg },
      { name: "Coconut Shell Pot", image: testImg },
      { name: "Planter with Small Plants", image: testImg },
      { name: "Rubber Door Mat", image: testImg },
      { name: "Moon and Star Hanging Ornament", image: testImg },
    ],
    viewProducts: true,
    path: "/gallery/gift-packaging"
  },
  {
    title: "Home & Garden",
    products: [
      { name: "Coaster Set 4", image: testImg },
      { name: "Bread Tray", image: testImg },
      { name: "Charger Plate", image: testImg },
      { name: "Shell Platter", image: testImg },
      { name: "Set of Heart Bowls", image: testImg },
      { name: "Dipping Bowl", image: testImg },
      { name: "Raffia Tray", image: testImg },
      { name: "Coco Spoon and Fork Set of 2", image: testImg },
      { name: "Cake Plate", image: testImg },
      { name: "Plato", image: testImg},
    ],
    viewProducts: true,
    path: "/gallery/home-garden"
  },
  {
    title: "Kitchen & Dining",
    products: [
      { name: "Coaster Set 4", image: testImg },
      { name: "Bread Tray", image: testImg },
      { name: "Charger Plate", image: testImg },
      { name: "Shell Platter", image: testImg },
      { name: "Set of Heart Bowls", image: testImg },
      { name: "Dipping Bowl", image: testImg },
      { name: "Raffia Tray", image: testImg },
      { name: "Coco Spoon and Fork Set of 2", image: testImg },
      { name: "Cake Plate", image: testImg },
      { name: "Plato", image: testImg},
    ],
    viewProducts: true,
    path: "/gallery/kitchen-dining"
  },
  {
    title: "Stationaries & Desk Accessories",
    products: [
      { name: "Coaster Set 4", image: testImg },
      { name: "Bread Tray", image: testImg },
      { name: "Charger Plate", image: testImg },
      { name: "Shell Platter", image: testImg },
      { name: "Set of Heart Bowls", image: testImg },
      { name: "Dipping Bowl", image: testImg },
      { name: "Raffia Tray", image: testImg },
      { name: "Coco Spoon and Fork Set of 2", image: testImg },
      { name: "Cake Plate", image: testImg },
      { name: "Plato", image: testImg},
    ],
    viewProducts: true,
    path: "/gallery/stationaries-desk"
  },
  {
    title: "Supported Communities",
    products: [
      { name: "Coaster Set 4", image: testImg },
      { name: "Bread Tray", image: testImg },
      { name: "Charger Plate", image: testImg },
      { name: "Shell Platter", image: testImg },
      { name: "Set of Heart Bowls", image: testImg },
      { name: "Dipping Bowl", image: testImg },
      { name: "Raffia Tray", image: testImg },
      { name: "Coco Spoon and Fork Set of 2", image: testImg },
      { name: "Cake Plate", image: testImg },
      { name: "Plato", image: testImg},
    ],
    viewProducts: true,
    path: "/gallery/supported-communities"
  },
  {
    title: "Christmas & Holidays",
    products: [
      { name: "Coaster Set 4", image: testImg },
      { name: "Bread Tray", image: testImg },
      { name: "Charger Plate", image: testImg },
      { name: "Shell Platter", image: testImg },
      { name: "Set of Heart Bowls", image: testImg },
      { name: "Dipping Bowl", image: testImg },
      { name: "Raffia Tray", image: testImg },
      { name: "Coco Spoon and Fork Set of 2", image: testImg },
      { name: "Cake Plate", image: testImg },
      { name: "Plato", image: testImg},
    ],
    viewProducts: true,
    path: "/gallery/christmas-holidays"
  },
  {
    title: "Toys & Games",
    products: [],
    viewProducts: false,
    path: "/gallery/toys-games"
  },
];


function ProductCard({ product }) {
  return (
    <motion.article
      variants={productAnimation}
      whileHover={{
        y: -6,
        transition: { duration: 0.2 },
      }}
      className="text-center"
    >
      <div className="mb-3 flex aspect-square items-center justify-center">
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          className="flex h-full w-full items-center justify-center"
        >
          <Image
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </motion.div>
      </div>

      <h3 className="mx-auto max-w-[150px] text-xs font-medium leading-snug text-[#0B2A26] sm:text-[13px] sailec-bold">
        {product.name}
      </h3>
    </motion.article>
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
            <ProductCard key={`${product.name}-${index}`} product={product} />
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

      {categories.map((category) => (
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
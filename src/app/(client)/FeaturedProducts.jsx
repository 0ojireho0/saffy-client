import React, {useState} from 'react'
import Image from 'next/image';
import { motion } from "framer-motion";

import img1 from "@/assets/images/featured-products/img1.jpg";
import img2 from "@/assets/images/featured-products/img2.jpg";
import img3 from "@/assets/images/featured-products/img3.jpg";
import img4 from "@/assets/images/featured-products/img4.jpg";
import img5 from "@/assets/images/featured-products/img5.jpg";
import ProductsPopupModal from '@/components/ProductsPopupModal';


function FeaturedProducts() {

  const [showProductModal, setShowProductModal] = useState(false)
  const [getItemDesc, setGetItemDesc] = useState({
    img: null,
    title: "",
    description: "",
  })

  const featuredProductsList = [
    { id: 1, title: "Capiz Nativity Decor", desc: "Handcrafted capiz nativity decor. A timeless accent for any space.", img: img1 },
    { id: 2, title: "Sabutan Lady Hat", desc: "Woven sabutan hat with colorful detail. Lightweight and breathable.", img: img2 },
    { id: 3, title: "Capiz Earrings", desc: "Capiz shell earrings with vibrant color. Lightweight and eye-catching.", img: img3 },
    { id: 4, title: "Long Chopping Board", desc: "Solid wood chopping board. Durable and functional.", img: img4 },
    { id: 5, title: "Laminated Capiz Square Coaster", desc: "Laminated capiz shell coaster. Protects surfaces in style.", img: img5 },
  ];

  const sectionFade = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  const showProductsModal = (item) => {
    setShowProductModal(true)
    setGetItemDesc({
      img: item.img,
      title: item.title,
      description: item.desc
    })

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
          {/* Header */}
          <div className="pt-12 md:pt-16 lg:pt-20 text-center px-4 md:px-10 lg:px-0">
            <h1 className="helvetica-bold text-[24px] md:text-[28px] lg:text-[32px]">
              FEATURED PRODUCTS
            </h1>
            <h1 className="mt-3 sailec-regular text-[#52726E] text-[18px] md:text-[22px] lg:text-[28px]">
              Discover products that reflects our purpose
            </h1>
          </div>

          {/* Grid (fixed: container + motion children) */}
          <div className="mt-10 md:mt-12 lg:mt-15 px-4 md:px-10 lg:px-34.5">
            <div className="mx-auto w-full max-w-400">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 md:gap-6 lg:gap-9"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {featuredProductsList.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    className="flex flex-col items-center md:items-start"
                  >
                    <div className="relative w-full aspect-square overflow-hidden rounded-[20px] group cursor-pointer"
                      onClick={() => showProductsModal(item)}
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 280px"
                      />

                      {/* Hover Overlay */}
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
                      {item.desc}
                    </h1>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Button */}
          <div className="py-15 text-center px-4">
            <button className="text-[#E1F1D5] bg-[#0B2B26] pt-3 pb-1.5 px-5 rounded-full sailec-medium text-[16px] cursor-pointer hover:scale-110 transition-transform">
              VIEW MORE PRODUCTS
            </button>
          </div>
        </motion.section>

        <ProductsPopupModal 
          setShow={setShowProductModal}
          show={showProductModal}
          image={getItemDesc.img}
          title={getItemDesc.title}
          description={getItemDesc.description}
        />
    
    
    </>
  )
}

export default FeaturedProducts

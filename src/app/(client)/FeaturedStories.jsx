'use client'
import React from "react"
import { useRouter } from "next/navigation"

import img1Hover from "@/assets/images/img1_hover.jpg"
import img2Hover from "@/assets/images/img2_hover.jpg"
import img3Hover from "@/assets/images/about/how-we-make-difference.png"

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import useStories from "@/hooks/Client/useStories";
import { isProd } from "@/lib/axios";
import Loading from "@/components/Loading";
import Button from "@/components/Button"

export default function FeaturedStories(){

    const router = useRouter()
  const items = [
    {
      id: 1,
      title: "Stories from\nthe Studio",
      author: "Jane Doe",
      publication_image_path: img1Hover,
    },
    {
      id: 2,
      title: "Handmade Ceramics",
      author: "Studio Notes",
      publication_image_path: img2Hover,
    },
    {
      id: 3,
      title: "Woven Baskets",
      author: "Craft Archive",
      publication_image_path: img3Hover,
    },
  ];

  const { story, isLoading } = useStories();

  if (isLoading) {
    return <Loading />;
  }

  // Variants
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



  const sectionFade = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  const handleShowStory = (data) => {
    router.push(`/stories/${data.id}`)
  }


    return(
    <>
        <motion.section
          className="w-full"
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="grid grid-cols-1 xl:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {story?.length > 2 ? story?.slice(0, 3).map((item) => (
                <motion.article
                    key={item.id}
                    variants={fadeUp}
                    className="group relative isolate overflow-hidden bg-slate-950 cursor-pointer min-h-[420px] h-[65vh] sm:h-[60vh] lg:h-[70vh] xl:h-[85vh]"
                    onClick={() => handleShowStory(item)}
                >
                    <Image
                    src={`${isProd ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API : process.env.NEXT_PUBLIC_BACKEND_API}/storage/${item.publication_image_path}`}
                    alt={item.title.replace("\n", " ")}
                    fill
                    priority={item.id === 1}
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />

                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/10 to-[#06332B] opacity-70 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100" />

                    <div className="absolute inset-x-4 bottom-4 z-20 text-white transition-all duration-300 ease-out sm:inset-x-6 sm:bottom-6 lg:inset-x-8 lg:bottom-8 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 sailec-medium">
                    <h3 className="whitespace-pre-line leading-[0.95] tracking-tight text-[32px] sm:text-[42px] md:text-[52px] lg:text-[64px] xl:text-[76px] 2xl:text-[88px]">
                        {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80 sm:text-base md:text-lg lg:text-[22px] xl:text-[26px]">
                        {item.author}
                    </p>
                    </div>

                    <span className="absolute inset-0 z-30 ring-0 ring-white/40 transition focus-within:ring-2" />
                </motion.article>
            )) : (
              <>
                {items.map((item) => (
                <motion.article
                    key={item.id}
                    variants={fadeUp}
                    className="group relative isolate overflow-hidden bg-slate-950 cursor-pointer min-h-[420px] h-[65vh] sm:h-[60vh] lg:h-[70vh] xl:h-[85vh]"
                >
                    <Image
                    src={`${isProd ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API : process.env.NEXT_PUBLIC_BACKEND_API}/storage/${item.publication_image_path}`}
                    alt={item.title.replace("\n", " ")}
                    fill
                    priority={item.id === 1}
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/10 to-[#06332B] opacity-70 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100" />

                    <div className="absolute inset-x-4 bottom-4 z-20 text-white transition-all duration-300 ease-out sm:inset-x-6 sm:bottom-6 lg:inset-x-8 lg:bottom-8 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 sailec-medium">
                    <h3 className="whitespace-pre-line leading-[0.95] tracking-tight text-[32px] sm:text-[42px] md:text-[52px] lg:text-[64px] xl:text-[76px] 2xl:text-[88px]">
                        {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80 sm:text-base md:text-lg lg:text-[22px] xl:text-[26px]">
                        {item.author}
                    </p>
                    </div>

                    <span className="absolute inset-0 z-30 ring-0 ring-white/40 transition focus-within:ring-2" />
                </motion.article>
                ))}
                
              </>
            )}
          </motion.div>

          <motion.div
            className="flex items-center justify-center px-6 py-12 sm:py-16 lg:py-20"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <Link
              href="/stories"
              type="button"
            >
              <Button 
                title={"MORE NEWS & STORIES"}
                className={"bg-[#0B2B26] text-[#E1F1D5] transition-transform hover:scale-105 text-[16px] py-3 px-5 cursor-pointer"}
              />
            </Link>
          </motion.div>
        </motion.section>
    
    </>

    )
}
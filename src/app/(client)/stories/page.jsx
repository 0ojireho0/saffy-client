'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import useStories from '@/hooks/Client/useStories';
import { isProd } from '@/lib/axios';
import { useRouter } from 'next/navigation';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ClientStories() {
  const { story, isLoading } = useStories();

  const router = useRouter()

  const handleShowStory = (data) => {
    router.push(`/stories/${data.id}`)
  }

  return (
    <section className="min-h-screen bg-white px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center sm:mb-14"
        >
          <h2 className="text-[28px] text-[#0B2A26] sm:text-[36px] helvetica-bold">
            NEWS & STORIES
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="mt-8 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <StorySkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-8 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {story?.map((item) => (
              <NewsStoryCard key={item.id} item={item} handleShowStory={handleShowStory} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}


function NewsStoryCard({ item, handleShowStory }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative w-full max-w-[400px] cursor-pointer"
    >
      <div className="flex h-[440px] flex-col overflow-hidden rounded-[10px] border border-[#D7E4DF] bg-white shadow-sm transition-all duration-300"
        onClick={() => handleShowStory(item)}
      >
        <div className="relative h-[45%] w-full overflow-hidden bg-[#E9F0EC]">
          {imageLoading && (
            <div className="absolute inset-0 z-10 animate-pulse bg-[#E9F0EC]" />
          )}

          <Image
            src={`${isProd ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API : process.env.NEXT_PUBLIC_BACKEND_API}/storage/${item.publication_image_path}`}
            alt={item.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-[1.03] ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            unoptimized
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </div>

        <div className="flex flex-1 flex-col bg-white p-4 transition-colors duration-300 sm:p-5 group-hover:bg-[#002520]">
          <span className="inline-flex w-fit rounded-full bg-[#E4E9A7] pt-[6px] pb-[4px] px-[12px] text-[12px] leading-none tracking-wide text-[#05251F] sailec-regular">
            {item.type.toUpperCase()}
          </span>

          <h3 className="mt-4 line-clamp-2 text-[24px] leading-[1.1] text-[#0B2A26] transition-colors duration-300 max-sm:text-[22px] sailec-bold group-hover:text-white">
            {item.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-[16px] leading-[1.2] text-[#52726E] transition-colors duration-300 sailec-regular group-hover:text-[#dfeae6]">
            {item.content}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function StorySkeleton() {
  return (
    <div className="w-full max-w-[400px]">
      <div className="flex h-[440px] animate-pulse flex-col overflow-hidden rounded-[10px] border border-[#D7E4DF] bg-white shadow-sm">
        <div className="h-[45%] w-full bg-[#E9F0EC]" />

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="h-7 w-20 rounded-full bg-[#E4ECE8]" />
          <div className="mt-4 h-7 w-[85%] rounded bg-[#E4ECE8]" />
          <div className="mt-2 h-7 w-[70%] rounded bg-[#E4ECE8]" />
          <div className="mt-4 h-4 w-full rounded bg-[#E4ECE8]" />
          <div className="mt-2 h-4 w-[90%] rounded bg-[#E4ECE8]" />
          <div className="mt-2 h-4 w-[75%] rounded bg-[#E4ECE8]" />
        </div>
      </div>
    </div>
  );
}
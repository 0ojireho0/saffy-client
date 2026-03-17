'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus, Trash2, Pencil, Settings } from 'lucide-react'

import img from "@/assets/images/about/how-we-make-difference.png";

const stories = [
  {
    id: 1,
    type: 'NEWS',
    title: 'Saffy Inc. Expands Operations to Southeast Asia',
    description:
      'As part of its growth strategy, Saffy Inc. strengthens its regional presence to better support clients and partners across emerging markets.',
    image: img,
  },
  {
    id: 2,
    type: 'NEWS',
    title: 'Saffy Inc. Expands Operations to Southeast Asia',
    description:
      'As part of its growth strategy, Saffy Inc. strengthens its regional presence to better support clients and partners across emerging markets.',
    image: img,
  },
  {
    id: 3,
    type: 'NEWS',
    title: 'From Concept to Launch: The Journey of a Saffy Product',
    description:
      'An inside story on how an idea evolved into a fully realized product—balancing creativity, strategy, and technical execution.',
    image: img,
  },
  {
    id: 4,
    type: 'STORIES',
    title: 'Saffy Inc. Announces Strategic Technology Partnership',
    description:
      'Saffy Inc. partners with industry leaders to accelerate innovation and deliver scalable solutions for modern businesses.',
    image: img,
  },
  {
    id: 5,
    type: 'STORIES',
    title: 'Saffy Inc. Announces Strategic Technology Partnership',
    description:
      'Saffy Inc. partners with industry leaders to accelerate innovation and deliver scalable solutions for modern businesses.',
    image: img,
  },
]

function StoryCard({ item }) {
  return (
    <div className="w-full max-w-[400px] h-[440px] flex flex-col overflow-hidden rounded-[10px] border border-[#D7E4DF] bg-white">
      
      {/* Image */}
      <div className="relative h-[45%] w-full shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="inline-flex w-fit rounded-full bg-[#D8DE8C] px-3 py-1 text-[12px] text-[#05251F] sailec-regular">
          {item.type}
        </span>

        <h3 className="mt-4 line-clamp-2 text-[24px] leading-[1.1] text-[#0B2A26] max-sm:text-[22px] sailec-bold">
          {item.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-[16px] leading-[1.2] text-[#52726E] sailec-regular">
          {item.description}
        </p>
      </div>
    </div>
  )
}

function AddNewCard() {
  return (
    <button
      type="button"
      className="w-full max-w-[400px] h-[440px] flex flex-col items-center justify-center rounded-[10px] border border-[#D7E4DF] bg-[#F8F8F8] text-[#D2CACA] transition hover:bg-[#F4F4F4]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9D3D3] text-white">
        <Plus size={24} />
      </div>
      <span className="mt-4 text-[20px] font-medium">Add New</span>
    </button>
  )
}

export default function Stories() {
  return (
    <div className="min-h-screen bg-white">

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <h1 className="text-center text-[32px] font-semibold text-[#16332E] max-sm:text-[28px] helvetica-bold">
          NEWS & STORIES
        </h1>

        {/* Actions */}
        <div className="mt-8 flex items-center gap-3 sm:mt-10">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8DFDF] text-[#FF3B30]"
            aria-label="Delete"
          >
            <Trash2 size={20} />
          </button>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DDF0E1] text-[#2C7A73]"
            aria-label="Edit"
          >
            <Pencil size={20} />
          </button>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
          <AddNewCard />

          {stories.map(item => (
            <StoryCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  )
}
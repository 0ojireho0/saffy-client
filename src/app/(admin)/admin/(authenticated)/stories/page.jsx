'use client'

import Image from 'next/image'
import { Plus, Trash2, Pencil, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import img from '@/assets/images/about/how-we-make-difference.png'
import { useAuth } from '@/hooks/auth'

const initialStories = [
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

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
}

function StoryCard({ item, showDeleteToggle, onDelete }) {
  return (
    <motion.div
      layout
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.28 }}
      className="relative w-full max-w-[400px]"
    >
      <AnimatePresence>
        {showDeleteToggle && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => onDelete(item.id)}
            className="absolute -right-3 -top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#F13324] text-white shadow-md"
            aria-label={`Delete ${item.title}`}
          >
            <X size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="h-[440px] overflow-hidden rounded-[10px] border border-[#D7E4DF] bg-white shadow-sm">
        <div className="relative h-[45%] w-full overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

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
    </motion.div>
  )
}

function AddNewCard() {
  return (
    <motion.button
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.97 }}
      type="button"
      className="flex h-[440px] w-full max-w-[400px] flex-col items-center justify-center rounded-[10px] border border-[#DBD7D7] bg-[#F8F8F8] text-[#DBD7D7] transition hover:bg-[#F4F4F4]"
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DBD7D7] text-white"
      >
        <Plus size={24} />
      </motion.div>
      <span className="mt-4 text-[20px] sailec-medium">Add New</span>
    </motion.button>
  )
}

function DeleteConfirmation({ onClose, onConfirm }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full max-w-[500px]
          min-h-[295px]
          rounded-[28px]
          bg-[#F5F5F5]
          px-5 py-5
          sm:px-6 sm:py-6
        "
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#247C74]"
          aria-label="Close confirmation modal"
        >
          <X size={24} strokeWidth={3} />
        </button>

        <div className="flex h-full flex-col items-center justify-between text-center">
          <div>
            <h2 className="mt-2 text-[28px] leading-none text-[#052D28] sm:text-[36px] helvetica-bold">
              Delete this entry?
            </h2>

            <p className="mx-auto mt-4 max-w-[390px] text-[14px] leading-[1.35] text-[#5D7F79] sm:mt-5 sm:text-[16px] sailec-regular">
              Permanently remove this blog entry from the page. This action
              cannot be undone and the content will no longer be visible to
              readers.
            </p>
          </div>

          <div className="mt-6 grid w-full grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex h-[52px] items-center justify-center rounded-full bg-[#DCECDF] px-4 text-[20px] text-[#247C74] sm:h-[56px] sm:text-[22px] sailec-bold"
            >
              Keep
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="flex h-[52px] items-center justify-center rounded-full bg-[#F0160A] px-4 text-[20px] text-white sm:h-[56px] sm:text-[22px] sailec-bold"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Stories() {
  useAuth({
    middleware: 'auth',
  })

  const [stories, setStories] = useState(initialStories)
  const [showDeleteToggle, setShowDeleteToggle] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [selectedStoryId, setSelectedStoryId] = useState(null)

  const handleDeleteMode = () => {
    setShowDeleteToggle((prev) => !prev)
  }

  const handleDeleteStory = (id) => {
    setSelectedStoryId(id)
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = () => {
    if (selectedStoryId === null) return

    setStories((prev) => prev.filter((story) => story.id !== selectedStoryId))
    setShowDeleteConfirmation(false)
    setSelectedStoryId(null)
  }

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false)
    setSelectedStoryId(null)
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-[32px] font-semibold text-[#16332E] max-sm:text-[28px] helvetica-bold"
          >
            NEWS & STORIES
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex items-center gap-3 sm:mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={handleDeleteMode}
              className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                showDeleteToggle
                  ? 'bg-[#FF3B30] text-white'
                  : 'bg-[#F8DFDF] text-[#FF3B30]'
              }`}
              aria-label="Toggle delete mode"
            >
              <Trash2 size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DDF0E1] text-[#2C7A73]"
              aria-label="Edit"
            >
              <Pencil size={20} />
            </motion.button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-8 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AddNewCard />

            <AnimatePresence mode="popLayout">
              {stories.map((item) => (
                <StoryCard
                  key={item.id}
                  item={item}
                  showDeleteToggle={showDeleteToggle}
                  onDelete={handleDeleteStory}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>

      <AnimatePresence>
        {showDeleteConfirmation && (
          <DeleteConfirmation
            onClose={handleCloseDeleteConfirmation}
            onConfirm={handleConfirmDelete}
          />
        )}
      </AnimatePresence>
    </>
  )
}
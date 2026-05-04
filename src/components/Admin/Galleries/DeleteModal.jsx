import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

function DeleteProductModal({ open, onClose, onDelete, loading }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-5 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-[680px] rounded-[48px] bg-white px-8 py-14 sm:px-14 sm:py-16 text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-[34px] top-[28px] text-[#1F746D]"
            >
              <X size={30} strokeWidth={4} />
            </button>

            <h2 className="text-[#0B2A26] text-[34px] sm:text-[46px] leading-tight sailec-bold mb-8">
              Delete this product?
            </h2>

            <p className="text-[#52726E] text-[20px] sm:text-[25px] leading-[1.35] sailec-regular mx-auto max-w-[570px] mb-14">
              Permanently remove this product from the gallery. This action
              cannot be undone and the product will no longer be visible or
              available on the site.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="h-[64px] rounded-full bg-[#DCF5E4] text-[#1F746D] text-[28px] sailec-bold disabled:opacity-60"
              >
                Keep
              </button>

              <button
                type="button"
                onClick={onDelete}
                disabled={loading}
                className="h-[64px] rounded-full bg-[#EA1B10] text-white text-[28px] sailec-bold disabled:opacity-60"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeleteProductModal
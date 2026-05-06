import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

function FeatureSuccessModal({ open, onClose }) {
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
            className="relative w-full max-w-[500px] rounded-[36px] bg-white p-10 text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-[30px] top-[25px] text-[#1F746D]"
            >
              <X size={20} strokeWidth={3.5} />
            </button>

            <h2 className="text-[#0B2A26] text-[26px] leading-none sailec-bold mb-5">
              Product Featured!
            </h2>

            <p className="text-[#52726E] text-[16px] leading-[1.25] sailec-regular mx-auto">
              The product has been successfully added as a featured item and
              will now be highlighted in the Gallery section.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FeatureSuccessModal
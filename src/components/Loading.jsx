'use client'
import React from 'react'
import { ClipLoader } from 'react-spinners'

export default function Loading({text}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white text-center">
      
      <ClipLoader
        color="#227369"
        size={50}
        speedMultiplier={1}
      />

      <p className="mt-5 text-lg font-semibold text-gray-600 sailec-regular">
        {text}
      </p>
    </div>
  )
}
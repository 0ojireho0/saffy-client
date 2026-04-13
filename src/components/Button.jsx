import React from 'react'

export default function Button({title, className}) {
  return (
    <button className={`mt-7 sm:mt-8 sailec-medium text-center rounded-full ${className || ''}`}>
       {title}
    </button>
  )
}

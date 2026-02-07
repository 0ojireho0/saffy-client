import React from 'react'

function Label({children, className}) {
  return (
    <h1 
        className={`helvetica-bold font-bold text-2xl lg:text-[32px] ${className}`}
    
    >{children}</h1>
  )
}

export default Label

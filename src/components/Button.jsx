'use client'
import React from 'react';

export default function Button({ title, className = '', ...props }) {
  return (
    <button
      className={`sailec-medium text-center rounded-full ${className}`}
      {...props}
    >
      {title}
    </button>
  );
}
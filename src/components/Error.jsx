import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Link from 'next/link'

export default function Error({error, text, backPath}) {
  return (
        <div className="flex absolute inset-0 h-full flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white px-6 text-center">
            
            <div className="w-[300px]">
                <DotLottieReact
                    src="https://lottie.host/4f3884b6-1838-45b8-87c3-bf116fefb379/jaWELzN5fp.lottie"
                    loop
                    autoplay
                />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-800 helvetica-bold">
                Story Not Found
            </h1>
            <p className="mt-3 max-w-md text-gray-600 sailec-regular">
                {error}
            </p>
            <Link
                href={backPath}
                className="mt-6 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 sailec-regular"
            >
                {text}
            </Link>
        </div>
  )
}

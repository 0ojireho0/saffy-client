'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Images
import heroImg from "@/assets/images/hero-img.png"
import upperleft from "@/assets/images/admin/upperleft.png"
import upperright from "@/assets/images/admin/upperright.png"
import lowerleft from "@/assets/images/admin/lowerleft.png"
import lowerright from "@/assets/images/admin/lowerright.png"

import { useForm } from 'react-hook-form'
import { User, Lock, ChevronLeft } from 'lucide-react';


import { useAuth } from '@/hooks/auth'

function Login() {


  const [error, setError] = useState([])
  const [loading, setLoading] = useState(false)

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/admin/stories"
  })


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const loginSubmit = (data) => {
    
    setLoading(true)
    login({
      ...data,
      setErrors: setError,
      setLoading

    })


  }

  return (
    <div className='flex min-h-screen flex-col lg:h-screen lg:flex-row'>
      {/* LEFT SIDE */}
      <div className='relative hidden lg:block lg:basis-3/5 overflow-hidden'>
        <Image
          src={heroImg}
          alt='Saffy'
          fill
          className='object-cover'
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#0B2B26]/20 to-[#0B2B26]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(11,43,38,0.12)_0%,_rgba(11,43,38,0.45)_45%,_rgba(11,43,38,0)_100%)]" />

        <div className='relative z-10 flex h-full flex-col justify-end px-10 xl:px-14 py-10 xl:py-12'>
          <div className='mb-16 flex flex-col items-center text-center'>
            <h1 className='helvetica-regular text-[14px] xl:text-[16px] tracking-[0.18em] text-white uppercase'>
              ADMIN PORTAL
            </h1>

            <h1 className='mt-3 sailec-bold text-[56px] xl:text-[80px] leading-none text-white'>
              Saffy Inc.
            </h1>

            <p className='mt-5 w-full max-w-[420px] sailec-regular text-[18px] xl:text-[24px] leading-[1.2] text-[#FDFEED] uppercase'>
              Empowering Filipino Artisans Toward Development
            </p>
          </div>

          <div className='flex items-center gap-2 text-white text-[15px] xl:text-[20px] helvetica-regular cursor-pointer hover:underline'>
            <ChevronLeft className='h-5 w-5 xl:h-6 xl:w-6' />
            <Link href={"/"}>LINK TO WEBSITE</Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className='relative flex min-h-screen basis-full overflow-hidden bg-white lg:basis-[40%]'>
        <div className='absolute top-0 left-0 w-[110px] sm:w-[130px] md:w-[150px] lg:w-[170px] xl:w-[200px] 2xl:w-[450px]'>
          <Image src={upperleft} alt='image' className='w-full h-auto' priority />
        </div>

        <div className='absolute top-0 right-0 w-[90px] sm:w-[105px] md:w-[125px] lg:w-[150px] xl:w-[180px] 2xl:w-[253px]'>
          <Image src={upperright} alt='image' className='w-full h-auto' priority />
        </div>

        <div className='absolute bottom-0 left-0 w-[105px] sm:w-[125px] md:w-[145px] lg:w-[165px] xl:w-[190px] 2xl:w-[306px]'>
          <Image src={lowerleft} alt='image' className='w-full h-auto' priority />
        </div>

        <div className='absolute bottom-0 right-0 w-[105px] sm:w-[125px] md:w-[145px] lg:w-[165px] xl:w-[190px] 2xl:w-[306px]'>
          <Image src={lowerright} alt='image' className='w-full h-auto' priority />
        </div>

        <div className='relative z-10 flex w-full items-center justify-center px-5 py-12 sm:px-8 md:px-10 lg:px-12 xl:px-15'>
          <div className='w-full max-w-[520px]'>
            <div className='flex flex-col gap-[12px]'>
              <h1 className='helvetica-regular text-[34px] sm:text-[38px] md:text-[42px] lg:text-[44px] xl:text-[48px] text-[#0A2925]'>
                Welcome!
              </h1>

              <h1 className='text-[#52726E] sailec-regular text-[15px] sm:text-[16px] md:text-[18px] lg:text-[18px] xl:text-[20px] w-full md:w-[85%] lg:w-[80%]'>
                To edit and add news, stories, and products, please sign in using an admin account.
              </h1>
            </div>

            <form
              onSubmit={handleSubmit(loginSubmit)}
              className='mt-[36px] sm:mt-[40px] md:mt-[44px] lg:mt-[50px]'
            >
              <div className='flex flex-col gap-[8px]'>
                <div className='flex items-center gap-[4px]'>
                  <User className='h-4 w-4 sm:h-5 sm:w-5 text-[#227369]' />
                  <label
                    htmlFor='username'
                    className='text-[#52726E] sailec-regular text-[14px] sm:text-[15px] md:text-[16px]'
                  >
                    Username
                  </label>
                </div>

                <input
                  id='username'
                  type='text'
                  aria-invalid={errors.username ? 'true' : 'false'}
                  {...register('username', {
                    required: 'Username is required',
                  })}
                  className={`w-full bg-white outline-none border h-[44px] sm:h-[46px] md:h-[48px] p-2 rounded-[4px] text-base sm:text-lg sailec-regular ${
                    errors.username
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#E3E3E3] focus:border-[#227369]'
                  }`}
                />

                {errors.username?.message && (
                  <p className='text-red-700 text-sm helvetica-regular'>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-[8px] mt-[20px] sm:mt-[22px] md:mt-[24px]'>
                <div className='flex items-center gap-[4px]'>
                  <Lock className='h-4 w-4 sm:h-5 sm:w-5 text-[#227369]' />
                  <label
                    htmlFor='password'
                    className='text-[#52726E] sailec-regular text-[14px] sm:text-[15px] md:text-[16px]'
                  >
                    Password
                  </label>
                </div>

                <input
                  id='password'
                  type='password'
                  aria-invalid={errors.password ? 'true' : 'false'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className={`w-full bg-white outline-none border h-[44px] sm:h-[46px] md:h-[48px] p-2 rounded-[4px] text-base sm:text-lg sailec-regular ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#E3E3E3] focus:border-[#227369]'
                  }`}
                />

                {errors.password?.message && (
                  <p className='text-red-700 text-sm helvetica-regular'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              
              <h1 className='sailec-regular text-red-700 text-sm'>{error?.username}</h1>

              <div className='mt-[20px] sm:mt-[22px] md:mt-[24px]'>
                <button
                  type='submit'
                  disabled={loading}
                  className='bg-[#E4E9A7] sailec-medium pt-[10px] pb-[6px] px-[20px] sm:px-[22px] rounded-full cursor-pointer text-[14px] sm:text-[15px]'
                >
                  {loading ? "Loading..." : "LOGIN"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
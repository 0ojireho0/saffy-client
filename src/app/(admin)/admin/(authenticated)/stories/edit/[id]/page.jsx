'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { format } from 'date-fns'
import {
  ChevronLeft,
  Pencil,
  Calendar as CalendarIcon,
  BookOpenText,
  CirclePlus,
} from 'lucide-react'

import useStories from '@/hooks/Admin/useStories'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { isProd } from '@/lib/axios'

import { useAuth } from '@/hooks/auth';

export default function EditStory() {
  const params = useParams()
  const { id } = params

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [story, setStory] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [videoInputKey, setVideoInputKey] = useState(Date.now())

  const { validateStory, UpdateStory } = useStories()

  useAuth({
    middleware: "auth"
  })

  const {
    reset,
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author: '',
      content: '',
      title: '',
      category: '',
      date: null,
      timeRange: '',
      image: null,
      video: null,
    },
  })

  useEffect(() => {
    if (!id) return

    const fetchStory = async () => {
      setLoading(true)
      setError('')

      const content = await validateStory({ id, setError })

      if (content?.content) {
        setStory(content.content)
      }

      setLoading(false)
    }

    fetchStory()
  }, [id])

  useEffect(() => {
    if (!story) return

    reset({
      author: story.author || '',
      content: story.content || '',
      title: story.title || '',
      category: story.type || '',
      date: story.publish_date ? new Date(story.publish_date) : null,
      timeRange: story.reading_time || '',
      image: null,
      video: null,
    })

    if (story.publication_image_path) {
      setPreviewUrl(
        `${isProd ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API : process.env.NEXT_PUBLIC_BACKEND_API}/storage/${story.publication_image_path}`
      )
    }

    if (story.publication_video_path) {
      setVideoPreviewUrl(
        `${isProd ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API : process.env.NEXT_PUBLIC_BACKEND_API}/storage/${story.publication_video_path}`
      )
    }
  }, [story, reset])

  const selectedCategory = watch('category')
  const selectedDate = watch('date')

  const hasChanges = (data, story) => {
      const formattedDate = data.date
          ? format(data.date, 'yyyy-MM-dd')
          : null
      return !(
          data.author === story.author &&
          data.category === story.type &&
          data.content === story.content &&
          formattedDate === story.publish_date &&
          data.timeRange === story.reading_time &&
          data.title === story.title &&
          !(data.image instanceof File) &&
          !(data.video instanceof File)
      )
  }

    const onSubmit = async(data) => {

        if (!hasChanges(data, story)) {
            Swal.fire({
                title: "No field changes",
                text: "No changes in field, please try again.",
                icon: "warning"
            })
            return
        }

        const formattedDate = data.date
            ? format(data.date, 'yyyy-MM-dd')
            : null

        const formData = new FormData()

        if (data.title !== story.title)
            formData.append('title', data.title)

        if (data.author !== story.author)
            formData.append('author', data.author)

        if (data.category !== story.type)
            formData.append('category', data.category)

        if (formattedDate !== story.publish_date)
            formData.append('date', formattedDate)

        if (data.timeRange !== story.reading_time)
            formData.append('timeRange', data.timeRange)

        if (data.content !== story.content)
            formData.append('content', data.content)

        // VERY IMPORTANT
        if (data.image instanceof File) {
            formData.append('image', data.image)
        }
        if (data.video instanceof File) {
          formData.append('video', data.video)
        }
        setLoadingBtn(true)
        await UpdateStory({
            formData,
            setLoadingBtn,
            id: story?.id
        })



    }


  if (loading) return <Loading text="Loading..." />

  if (error) {
    return (
      <Error
        error={error}
        text="Go Back to Stories"
        backPath="/admin/stories"
      />
    )
  }

  return (
    <div className="min-h-screen bg-white text-[#0f3b36]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
        <div className="mb-6">
          <Link
            href="/admin/stories"
            className="inline-flex items-center gap-1 tracking-wide text-[#227369] transition hover:opacity-80"
          >
            <ChevronLeft />
            <span className="text-[18px] md:text-[20px] helvetica-regular">
              BACK
            </span>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <h1 className="text-xl helvetica-bold tracking-wide sm:text-2xl md:text-3xl">
              EDIT
            </h1>

            <div className="mt-8 flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setValue('category', 'news', { shouldDirty: true })
                }
                className={`rounded-full px-4 py-1 text-xs sailec-regular uppercase tracking-wide transition ${
                  selectedCategory === 'news'
                    ? 'bg-[#E4E9A7] text-[#05251F]'
                    : 'bg-[#E4E9A7]/23 text-[#05251F] opacity-50'
                }`}
              >
                News
              </button>

              <button
                type="button"
                onClick={() =>
                  setValue('category', 'stories', { shouldDirty: true })
                }
                className={`rounded-full px-4 py-1 text-xs sailec-regular uppercase tracking-wide transition ${
                  selectedCategory === 'stories'
                    ? 'bg-[#DFECEA] text-[#196EAB]'
                    : 'bg-[#E4E9A7]/23 text-[#05251F] opacity-50'
                }`}
              >
                Stories
              </button>

              <input type="hidden" {...register('category')} />
            </div>

            <input
              type="text"
              placeholder="Title"
              {...register('title', { required: 'Title is required' })}
              className="mt-6 h-14 w-full rounded-xl border border-[#ecf0ea] bg-[#F1F1F1] px-6 text-center text-2xl sailec-regular text-[#0f3b36] placeholder:text-[#c7c9c6] outline-none transition focus:border-[#b8c8b9] sm:text-3xl"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-500 sailec-regular">
                {errors.title.message}
              </p>
            )}

            <div className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="flex h-11 items-center gap-2 rounded-lg border border-[#edf1eb] bg-[#f2f4f0] px-3 text-sm text-[#6d8b84]">
                <Pencil />
                <input
                  type="text"
                  placeholder="Author"
                  {...register('author', { required: 'Author is required' })}
                  className="w-full bg-transparent text-sm text-[#0f3b36] placeholder:text-[#b9bdb8] outline-none sailec-regular"
                />
              </div>

              <div>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: 'Date is required' }}
                  render={({ field }) => (
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          className="relative flex h-11 w-full items-center justify-start gap-2 rounded-lg border border-[#edf1eb] bg-[#f2f4f0] px-3 text-left text-sm font-normal text-[#6d8b84] hover:bg-[#f2f4f0] sailec-regular"
                        >
                          <CalendarIcon className="h-5 w-5 shrink-0" />
                          <span
                            className={`sailec-regular ${
                              field.value ? 'text-[#0f3b36]' : 'text-[#b9bdb8]'
                            }`}
                          >
                            {field.value
                              ? format(field.value, 'MMM/dd/yyyy')
                              : 'MMM/DD/YYYY'}
                          </span>

                          {field.value && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation()
                                field.onChange(null)
                              }}
                              className="absolute right-3 cursor-pointer text-[#6d8b84] hover:text-[#0f3b36]"
                            >
                              ✕
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="start"
                        className="w-auto rounded-2xl border border-[#edf1eb] bg-white p-2 shadow-lg"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date)
                            if (date) setCalendarOpen(false)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>

              <div className="flex h-11 items-center gap-2 rounded-lg border border-[#edf1eb] bg-[#f2f4f0] px-3 text-sm text-[#6d8b84]">
                <BookOpenText />
                <input
                  type="text"
                  placeholder="Xm - Xm"
                  {...register('timeRange')}
                  className="w-full bg-transparent text-sm text-[#0f3b36] placeholder:text-[#b9bdb8] outline-none sailec-regular"
                />
              </div>
            </div>

            {(errors.author || errors.date) && (
              <div className="mt-3 space-y-1 text-sm text-red-500 sailec-regular">
                {errors.author && <p>{errors.author.message}</p>}
                {errors.date && <p>{errors.date.message}</p>}
              </div>
            )}
          </div>

          <div className="mt-8 rounded-2xl border-2 border-[#e6eeea] bg-[#eef1ee] p-4 sm:p-6 lg:mt-10">
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <label className="relative flex min-h-[280px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-transparent transition sm:min-h-[360px] lg:min-h-[420px]">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      if (!file) return

                      field.onChange(file)
                      clearErrors('image')

                      const nextPreviewUrl = URL.createObjectURL(file)
                      setPreviewUrl((previousUrl) => {
                        if (
                          previousUrl &&
                          previousUrl.startsWith('blob:')
                        ) {
                          URL.revokeObjectURL(previousUrl)
                        }
                        return nextPreviewUrl
                      })
                    }}
                  />

                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-[50%] w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <CirclePlus className="h-12 w-12" />
                      <span className="text-2xl sailec-regular text-[#DBD7D7] sm:text-4xl">
                        Add Image
                      </span>
                    </div>
                  )}
                </label>
              )}
            />
          </div>

          <div className="mx-auto mt-12 w-full max-w-3xl rounded-2xl border-2 border-[#e6eeea] bg-[#eef1ee] p-4 sm:p-6">
            <Controller
              name="video"
              control={control}
              rules={{
                validate: (file) => {
                  if (!file) return true

                  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']

                  if (!allowedTypes.includes(file.type)) {
                    return 'Only MP4, WEBM, OGG, or MOV videos are allowed'
                  }

                  if (file.size > 100 * 1024 * 1024) {
                    return 'Video must be 100MB or smaller'
                  }

                  return true
                },
              }}
              render={({ field }) => (
                <div className="relative">
                  <input
                    key={videoInputKey}
                    id="video-upload"
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      if (!file) return

                      field.onChange(file)
                      clearErrors('video')

                      const nextVideoPreviewUrl = URL.createObjectURL(file)

                      setVideoPreviewUrl((previousUrl) => {
                        if (previousUrl && previousUrl.startsWith('blob:')) {
                          URL.revokeObjectURL(previousUrl)
                        }

                        return nextVideoPreviewUrl
                      })

                      setVideoInputKey(Date.now())
                    }}
                  />

                  <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-transparent transition sm:min-h-[340px]">
                    {videoPreviewUrl ? (
                      <>
                        <video
                          src={videoPreviewUrl}
                          controls
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => document.getElementById('video-upload')?.click()}
                          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0f3b36] shadow-md transition hover:scale-105 hover:bg-[#E4E9A7]"
                        >
                          <Pencil size={20} />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => document.getElementById('video-upload')?.click()}
                        className="flex h-full w-full flex-col items-center justify-center"
                      >
                        <CirclePlus className="h-12 w-12" />
                        <span className="text-2xl sailec-regular text-[#DBD7D7] sm:text-4xl">
                          Add Video
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            />

            {errors.video && (
              <p className="mt-3 text-center text-sm text-red-500 sailec-regular">
                {errors.video.message}
              </p>
            )}
          </div>

          <div className="mx-auto mt-12 w-full max-w-3xl">
            <textarea
              placeholder="Content"
              {...register('content')}
              className="min-h-[220px] w-full resize-none rounded-2xl border border-[#edf1eb] bg-[#F1F1F1] px-6 py-8 text-left text-2xl text-[#0f3b36] placeholder:text-[#c7c9c6] outline-none transition focus:border-[#b8c8b9] sm:min-h-[260px] sm:text-2xl sailec-regular"
            />
          </div>

          <div className="mt-10 flex justify-center pb-8">
            <button
              type="submit"
              className="rounded-full bg-[#E4E9A7] px-[20px] pb-[6px] pt-[12px] text-sm font-semibold uppercase tracking-wide text-[#05251F] shadow-sm sailec-medium transition"
              disabled={loadingBtn ? true : false}
            >
              {loadingBtn ? "LOADING..." : "CONFIRM"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
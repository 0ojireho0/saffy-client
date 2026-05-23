'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Pencil, Calendar as CalendarIcon, BookOpenText, CirclePlus } from 'lucide-react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useAuth } from '@/hooks/auth';

import useStories from '@/hooks/Admin/useStories';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AddNewPage() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      category: 'news',
      title: '',
      author: '',
      date: undefined,
      timeRange: '',
      content: '',
      image: null,
      video: null,
    },
  });

  const { user } = useAuth({
    middleware: "auth"
  })

  const { AddStory } = useStories()

  const [previewUrl, setPreviewUrl] = useState('');
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const selectedCategory = watch('category');
  const selectedDate = watch('date');

  const formattedDate = useMemo(() => {
    if (!selectedDate) return 'MMM/DD/YYYY';
    return format(selectedDate, 'MMM/dd/yyyy');
  }, [selectedDate]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [previewUrl, videoPreviewUrl]);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('category', data.category);
        formData.append('title', data.title);
        formData.append('author', data.author);
        formData.append('date', data.date ? format(data.date, 'yyyy-MM-dd') : '');
        formData.append('timeRange', data.timeRange);
        formData.append('content', data.content);
        formData.append('image', data.image);
        if (data.video) {
          formData.append('video', data.video);
        }


        setLoading(true)
        AddStory({
            formData, 
            reset,
            setLoading,
            setPreviewUrl,
            setVideoPreviewUrl
        })

  };

  return (
    <div className="min-h-screen bg-white text-[#0f3b36]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div className="mb-6" variants={fadeUp} custom={0}>
          <Link
            href="/admin/stories"
            className="inline-flex items-center gap-1 tracking-wide text-[#227369] transition hover:opacity-80"
          >
            <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
              <ChevronLeft />
            </motion.span>
            <span className="text-[18px] md:text-[20px] helvetica-regular">BACK</span>
          </Link>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
            variants={fadeUp}
            custom={0.1}
          >
            <motion.h1
              className="text-xl helvetica-bold tracking-wide sm:text-2xl md:text-3xl"
              variants={fadeUp}
              custom={0.12}
            >
              ADD NEW
            </motion.h1>

            <motion.div className="mt-8 flex items-center gap-2" variants={fadeUp} custom={0.16}>
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setValue('category', 'news')}
                className={`rounded-full px-4 py-1 text-xs sailec-regular uppercase tracking-wide transition ${
                  selectedCategory === 'news'
                    ? 'bg-[#E4E9A7] text-[#05251F]'
                    : 'bg-[#E4E9A7]/23 text-[#05251F] opacity-50'
                }`}
              >
                News
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setValue('category', 'stories')}
                className={`rounded-full px-4 py-1 text-xs sailec-regular uppercase tracking-wide transition ${
                  selectedCategory === 'stories'
                    ? 'bg-[#DFECEA] text-[#196EAB]'
                    : 'bg-[#E4E9A7]/23 text-[#05251F] opacity-50'
                }`}
              >
                Stories
              </motion.button>
              <input type="hidden" {...register('category')} />
            </motion.div>

            <motion.input
              variants={fadeUp}
              custom={0.22}
              type="text"
              placeholder="Title"
              whileFocus={{ scale: 1.01 }}
              {...register('title', { required: 'Title is required' })}
              className="mt-6 h-14 w-full rounded-xl border border-[#ecf0ea] bg-[#F1F1F1] px-6 text-center text-2xl sailec-regular text-[#0f3b36] placeholder:text-[#c7c9c6] outline-none transition focus:border-[#b8c8b9] sm:text-3xl"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-500 sailec-regular">{errors.title.message}</p>
            )}

            <motion.div
              className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeUp}
                custom={0.28}
                whileHover={{ y: -3 }}
                className="flex h-11 items-center gap-2 rounded-lg border border-[#edf1eb] bg-[#f2f4f0] px-3 text-sm text-[#6d8b84]"
              >
                <Pencil />
                <input
                  type="text"
                  placeholder="Author"
                  {...register('author', { required: 'Author is required' })}
                  className="w-full bg-transparent text-sm text-[#0f3b36] placeholder:text-[#b9bdb8] outline-none sailec-regular"
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={0.34} whileHover={{ y: -3 }}>
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
                            className={`sailec-regular ${field.value ? 'text-[#0f3b36]' : 'text-[#b9bdb8]'}`}
                          >
                            {field.value ? formattedDate : 'MMM/DD/YYYY'}
                          </span>

                          {field.value && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                field.onChange(undefined);
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
                            field.onChange(date);
                            if (date) {
                              setCalendarOpen(false);
                            }
                          }}
                          className={"sailec-regular"}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={0.4}
                whileHover={{ y: -3 }}
                className="flex h-11 items-center gap-2 rounded-lg border border-[#edf1eb] bg-[#f2f4f0] px-3 text-sm text-[#6d8b84]"
              >
                <BookOpenText />
                <input
                  type="text"
                  placeholder="Xm - Xm"
                  {...register('timeRange', { required: 'Time range is required' })}
                  className="w-full bg-transparent text-sm text-[#0f3b36] placeholder:text-[#b9bdb8] outline-none sailec-regular"
                />
              </motion.div>
            </motion.div>

            {(errors.author || errors.date || errors.timeRange) && (
              <div className="mt-3 space-y-1 text-sm text-red-500 sailec-regular">
                {errors.author && <p>{errors.author.message}</p>}
                {errors.date && <p>{errors.date.message}</p>}
                {errors.timeRange && <p>{errors.timeRange.message}</p>}
              </div>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.46}
            className="mt-8 rounded-2xl border-2 border-[#e6eeea] bg-[#eef1ee] p-4 sm:p-6 lg:mt-10"
          >
            <Controller
              name="image"
              control={control}
              rules={{ required: 'Image is required' }}
              render={({ field }) => (
                <motion.label
                  whileHover={{ scale: 1.01 }}
                  className={`relative flex min-h-[280px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition sm:min-h-[360px] lg:min-h-[420px] ${
                    errors.image
                      ? 'border-red-300 bg-red-50/30'
                      : 'border-transparent text-[#c5c7c4] hover:border-[#dbe4dd]'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;

                      field.onChange(file);
                      clearErrors('image');

                      const nextPreviewUrl = URL.createObjectURL(file);
                      setPreviewUrl((previousUrl) => {
                        if (previousUrl) URL.revokeObjectURL(previousUrl);
                        return nextPreviewUrl;
                      });
                    }}
                  />

                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="h-[50%] w-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <CirclePlus className="h-12 w-12" />
                      </motion.div>
                      <span className="text-2xl sailec-regular text-[#DBD7D7] sm:text-4xl">
                        Add Image
                      </span>
                    </div>
                  )}
                </motion.label>
              )}
            />
            {errors.image && (
              <p className="mt-3 text-center text-sm text-red-500 sailec-regular">
                {errors.image.message}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.5}
            className="mx-auto mt-12 w-full max-w-3xl rounded-2xl border-2 border-[#e6eeea] bg-[#eef1ee] p-4 sm:p-6"
          >
            <Controller
              name="video"
              control={control}
              rules={{
                validate: (file) => {
                  if (!file) return true;

                  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];

                  if (!allowedTypes.includes(file.type)) {
                    return 'Only MP4, WEBM, or OGG videos are allowed';
                  }

                  if (file.size > 50 * 1024 * 1024) {
                    return 'Video must be 50MB or smaller';
                  }

                  return true;
                },
              }}
              render={({ field }) => (
                <motion.label
                  whileHover={{ scale: 1.01 }}
                  className={`relative flex min-h-[280px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition sm:min-h-[360px] ${
                    errors.video
                      ? 'border-red-300 bg-red-50/30'
                      : 'border-transparent text-[#c5c7c4] hover:border-[#dbe4dd]'
                  }`}
                >
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/ogg"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;

                      field.onChange(file);
                      clearErrors('video');

                      const nextVideoPreviewUrl = URL.createObjectURL(file);

                      setVideoPreviewUrl((previousUrl) => {
                        if (previousUrl) URL.revokeObjectURL(previousUrl);
                        return nextVideoPreviewUrl;
                      });
                    }}
                  />

                  {videoPreviewUrl ? (
                    <video
                      src={videoPreviewUrl}
                      controls
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <CirclePlus className="h-12 w-12" />
                      </motion.div>

                      <span className="text-2xl sailec-regular text-[#DBD7D7] sm:text-4xl">
                        Add Video
                      </span>
                    </div>
                  )}
                </motion.label>
              )}
            />

            {errors.video && (
              <p className="mt-3 text-center text-sm text-red-500 sailec-regular">
                {errors.video.message}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.54}
            className="mx-auto mt-12 w-full max-w-3xl"
          >
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              placeholder="Content"
              {...register('content', { required: 'Content is required' })}
              className="min-h-[220px] w-full resize-none rounded-2xl border border-[#edf1eb] bg-[#F1F1F1] px-6 py-8 text-left placeholder:text-center text-2xl text-[#0f3b36] placeholder:text-[#c7c9c6] outline-none transition focus:border-[#b8c8b9] sm:min-h-[260px] sm:text-2xl sailec-regular"
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-500 sailec-regular">{errors.content.message}</p>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.62}
            className="mt-10 flex justify-center pb-8"
          >
            <motion.button
              type="submit"
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-[#E4E9A7] py-3 px-5 text-sm font-semibold uppercase tracking-wide text-[#05251F] shadow-sm sailec-medium transition"
              disabled={loading ? true : false}
            >
              {loading ? "LOADING..." : "CONFIRM"}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

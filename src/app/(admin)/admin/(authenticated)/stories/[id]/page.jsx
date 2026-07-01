'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, CalendarDays, BookOpen, PenLine } from 'lucide-react'
import { isProd } from '@/lib/axios'

import useStories from '@/hooks/Admin/useStories'
import Error from '@/components/Error'
import Loading from '@/components/Loading'

import { useAuth } from '@/hooks/auth'

export default function StoryPage() {
    const params = useParams()
    const { id } = params

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [story, setStory] = useState(null)

    const { validateStory } = useStories()
    useAuth({
        middleware: "auth"
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

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

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
    }

    const formatDate = date => {
        if (!date) return ''
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        })
    }

    const getImageUrl = path => {
        console.log(path)
        if (!path) return '/images/placeholder-image.png'
        return `${isProd ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API : process.env.NEXT_PUBLIC_BACKEND_API}/storage/${path}`
    }

    const getVideoUrl = path => {
        if (!path) return null

        return `${isProd ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API : process.env.NEXT_PUBLIC_BACKEND_API}/storage/${path}`
    }

    const formattedContent = story?.content
        ? story.content.split('\n').filter(item => item.trim() !== '')
        : []

    if (loading) return <Loading text={"Loading..."} />

    if (error) {
        return <Error error={error} text={"Go Back to Stories"} backPath={"/admin/stories"} />
    }


    return (
        <div className="min-h-screen bg-[#f7f7f5] text-[#16302b]">
            <motion.div
                className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <motion.div
                    className="mb-6 sm:mb-8"
                    variants={fadeUp}
                    custom={0}
                >
                    <Link
                        href="/admin/stories"
                        className="inline-flex items-center gap-1 text-sm text-[#227369] transition hover:opacity-80 sm:text-base"
                    >
                        <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
                            <ChevronLeft size={20} />
                        </motion.span>
                        <span className="helvetica-regular">BACK</span>
                    </Link>
                </motion.div>

                <motion.section
                    className="mx-auto flex max-w-5xl flex-col items-center text-center"
                    variants={fadeUp}
                    custom={0.1}
                >
                    <motion.div
                        whileHover={{ y: -2, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`mb-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] sm:px-4 sm:text-xs ${
                            story?.type === 'news'
                                ? 'bg-[#E4E9A7] text-[#05251F]'
                                : 'bg-[#DFECEA] text-[#196EAB]'
                        } sailec-regular`}
                    >
                        {story?.type === 'news' ? 'News' : 'Stories'}
                    </motion.div>

                    <h1 className="max-w-4xl text-3xl leading-tight text-[#0B2A26] helvetica-bold sm:text-4xl md:text-5xl lg:leading-[1.08]">
                        {story?.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-[#4f6f69] sm:mt-5 sm:text-[15px]">
                        <div className="flex items-center gap-2">
                            <PenLine size={16} />
                            <span className="sailec-regular">{story?.author}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <CalendarDays size={16} />
                            <span className="sailec-regular">{formatDate(story?.publish_date)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <BookOpen size={16} />
                            <span className="sailec-regular">{story?.reading_time}</span>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    className="mx-auto mt-8 w-full max-w-6xl sm:mt-10 lg:mt-12"
                    variants={fadeUp}
                    custom={0.2}
                >
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 sm:rounded-[28px]">
                        <img
                            src={getImageUrl(story?.publication_image_path)}
                            alt={story?.title || 'Story image'}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </motion.section>

                {story?.publication_video_path && (
                    <motion.section
                        className="mx-auto mt-8 w-full max-w-6xl sm:mt-10 lg:mt-12"
                        variants={fadeUp}
                        custom={0.25}
                    >
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 sm:rounded-[28px]">
                            <video
                                src={getVideoUrl(story.publication_video_path)}
                                controls
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </motion.section>
                )}

                <motion.section
                    className="mx-auto mt-10 max-w-6xl px-1 sm:mt-12 md:mt-14"
                    variants={fadeUp}
                    custom={0.3}
                >
                    <div className="space-y-6 text-justify text-[15px] leading-8 text-[#5d7772] sm:text-base sm:leading-9 md:text-[22px] md:leading-10 sailec-regular break-words">
                        {formattedContent.length > 0 ? (
                            formattedContent.map((paragraph, index) => (
                                <p key={index} className="break-words whitespace-normal">{paragraph}</p>
                            ))
                        ) : (
                            <p className="break-words whitespace-normal">{story?.content}</p>
                        )}
                    </div>
                </motion.section>
            </motion.div>
        </div>
    )
}
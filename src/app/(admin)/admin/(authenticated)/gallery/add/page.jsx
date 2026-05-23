'use client';

import React, { useState, useRef } from 'react';
import Button from '@/components/Button';
import { Search, Plus, Grid3X3, Palette, Shapes, Ruler, Weight, ChevronLeft, ChevronRight, X, GalleryThumbnails  } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from 'framer-motion';

import useGalleries from '@/hooks/Admin/useGalleries';
import SuccessModal from '@/components/Admin/Galleries/SuccessModal';
import Link from 'next/link';

export default function AddGallery() {

  const router = useRouter()
  useAuth({
    middleware: 'auth',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const categoriesList = [
    {
      name: "FASHION",
      value: "fashion"
    },
    {
      name: "GIFTS & PACKAGING",
      value: "gifts"
    },
    {
      name: "HOME & GARDEN",
      value: "home"
    },
    {
      name: "KITCHEN & DINING",
      value: "kitchen"
    },
    {
      name: "STATIONARIES & DESK ACCESSORIES",
      value: "stationaries"
    },
    {
      name: "SUPPORTED COMMUNITIES (GBP PRODUCTS)",
      value: "supported"
    },
    {
      name: "CHRISTMAS & HOLIDAYS",
      value: "christmas"
    },
    {
      name: "TOYS & GAMES",
      value: "toys"
    },
  ]

  const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/quicktime',
  ];

  const { AddGallery } = useGalleries()

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

  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false)
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  const onSubmit = async (data) => {
    if (selectedFiles.length === 0) {
      alert('Image or video is required');
      return;
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'image') {
        formData.append(key, value);
      }
    });

    selectedFiles.forEach((file) => {
      formData.append('media[]', file);
    });

    formData.append('thumbnail_index', thumbnailIndex);

    await AddGallery({
      formData,
      reset,
      setLoading,
      setPreviews,
      onSuccess: () => setSuccessOpen(true),
    });
  };

  const imageRegister = register('image', {
    validate: {
      isValidMedia: (files) => {
        const selectedFiles = Array.from(files || []);

        if (selectedFiles.length === 0) return 'Image or video is required';

        const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

        if (totalSize > MAX_TOTAL_SIZE) {
          return 'Maximum total file size is 50MB';
        }

        for (const file of selectedFiles) {
          if (!allowedTypes.includes(file.type)) {
            return 'Only JPG, PNG, WEBP, MP4, WEBM, and MOV files are allowed';
          }
        }

        return true;
      },
    },
  });

  const handlePreview = (e) => {
    imageRegister.onChange(e);

    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);

    const invalidFile = files.find((file) => !allowedTypes.includes(file.type));

    if (invalidFile) {
      alert('Only JPG, PNG, WEBP, MP4, WEBM, and MOV files are allowed');
      e.target.value = '';
      setPreviews([]);
      setCurrentImageIndex(0);
      return;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      alert('Maximum total file size is 50MB');
      e.target.value = '';
      setPreviews([]);
      setCurrentImageIndex(0);
      return;
    }

    const previewUrls = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image',
    }));

    setSelectedFiles(files);
    setPreviews(previewUrls);
    setCurrentImageIndex(0);
  };

  const handleDeletePreview = (e) => {
    e.preventDefault();
    e.stopPropagation();

    URL.revokeObjectURL(previews[currentImageIndex]?.url);

    const updatedFiles = selectedFiles.filter((_, index) => index !== currentImageIndex);
    const updatedPreviews = previews.filter((_, index) => index !== currentImageIndex);

    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);

    if (thumbnailIndex === currentImageIndex) {
      setThumbnailIndex(0);
    } else if (thumbnailIndex > currentImageIndex) {
      setThumbnailIndex((prev) => prev - 1);
    }

    const dataTransfer = new DataTransfer();

    updatedFiles.forEach((file) => {
      dataTransfer.items.add(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }

    if (updatedPreviews.length === 0) {
      setCurrentImageIndex(0);
      setThumbnailIndex(0);
    } else if (currentImageIndex >= updatedPreviews.length) {
      setCurrentImageIndex(updatedPreviews.length - 1);
    }
  };

  const handleCloseProductAdded = () => {
    setSuccessOpen(false)
    router.push('/admin/gallery')
  }

  return (
    <>

    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white px-5 sm:px-8 lg:px-0"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >

      <div className="w-full max-w-[1180px] mx-auto pt-6">
        <motion.div
          className="mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <Link
            href="/admin/gallery"
            className="inline-flex items-center gap-1 tracking-wide text-[#227369] transition hover:opacity-80"
          >
            <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
              <ChevronLeft />
            </motion.span>
            <span className="text-[18px] md:text-[20px] helvetica-regular">
              BACK
            </span>
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="w-full flex items-center justify-center"
        variants={fadeUp}
        custom={0.08}
      >
        <motion.h1
          className="helvetica-bold text-[#0B2A26] text-[26px] sm:text-[32px] pt-[40px] sm:pt-[53px] pb-[40px] sm:pb-[60px]"
          variants={fadeUp}
          custom={0.12}
        >
          GALLERY
        </motion.h1>
      </motion.div>

      <motion.div 
        className="w-full max-w-[1180px] mx-auto flex flex-col md:flex-row justify-between items-start gap-5"   
        variants={fadeUp}
        custom={0.18}
      >
        <div className="w-full md:max-w-[590px]">
          <motion.div
            className="flex items-center gap-[14px]"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="text-[#167C71]" size={32} />

            <input
              {...register('product_id', { required: 'Product ID is required' })}
              placeholder="PRODUCT ID"
              className="w-full h-[42px] border border-[#167C71] rounded-[4px] px-[14px] sm:px-[16px]
              text-[16px] sm:text-[18px] text-[#0B2A26] placeholder:text-[#9E9E9E]
              outline-none focus:ring-1 focus:ring-[#167C71] helvetica-regular"
            />
          </motion.div>

          {errors.product_id && (
            <p className="text-red-500 text-sm mt-1 ml-[46px] sailec-regular">
              {errors.product_id.message}
            </p>
          )}
        </div>

        <div className='w-full'>
          <Select
            onValueChange={(value) => setValue('category', value, { shouldValidate: true })}
          >
            <SelectTrigger className={"w-full sailec-regular"}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {categoriesList.map((item, i) => (
                  <SelectItem
                    value={item.value}
                    key={i}
                    className={"sailec-regular"}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <input
            type="hidden"
            {...register('category', { required: 'Category is required' })}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1 sailec-regular">
              {errors.category.message}
            </p>
          )}
        </div>
      </motion.div>

      <motion.div 
        className="w-full max-w-[1180px] mx-auto mt-[42px] rounded-[18px] bg-[#F1F1F1] p-[30px] sm:p-[46px]"
        variants={fadeUp}
        custom={0.26}
        >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            <motion.div 
            className="relative min-h-[360px] lg:min-h-[640px] border border-dashed border-[#7F8B88] rounded-[12px] flex flex-col items-center justify-center overflow-hidden"
            variants={fadeUp}
            custom={0.32}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.25 }}
            >
              {previews?.length > 0 ? (
                <>
                  {previews[currentImageIndex]?.type === 'video' ? (
                    <video
                      src={previews[currentImageIndex].url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={previews[currentImageIndex]?.url}
                      alt={`Preview ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {previews[currentImageIndex]?.type !== 'video' && (
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setThumbnailIndex(currentImageIndex);
                            }}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 shadow-md cursor-pointer border transition-all duration-200 sailec-regular text-sm ${
                              thumbnailIndex === currentImageIndex
                                ? 'bg-[#DDE58F] border-[#0B2A26] text-[#0B2A26]'
                                : 'bg-white/85 border-white text-[#0B2A26] hover:bg-[#DDE58F]'
                            }`}
                          >
                            <GalleryThumbnails size={18} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='sailec-regular'>
                            Used as main gallery image
                          </p>
                        </TooltipContent>
                      </Tooltip>

      
                    </div>
                  )}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={handleDeletePreview}
                    className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow-md z-10"
                  >
                    <X size={24} className="text-[#0B2A26]" />
                  </motion.button>

                  {previews.length > 1 && (
                    <>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.08, x: -2 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          setCurrentImageIndex((prev) =>
                            prev === 0 ? previews.length - 1 : prev - 1
                          );
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10 cursor-pointer"
                      >
                        <ChevronLeft size={28} className="text-[#0B2A26]" />
                      </motion.button>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.08, x: 2 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          setCurrentImageIndex((prev) =>
                            prev === previews.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10 cursor-pointer"
                      >
                        <ChevronRight size={28} className="text-[#0B2A26]" />
                      </motion.button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full sailec-regular">
                        {currentImageIndex + 1} / {previews.length}
                      </div>
                    </>
                  )}

                  <motion.label
                    htmlFor="gallery-media"
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="absolute bottom-4 right-4 bg-white/80 rounded-full px-4 py-2 shadow-md cursor-pointer text-[#0B2A26] text-sm sailec-regular z-10"
                  >
                    Add More
                  </motion.label>
                </>
              ) : (
                <motion.label  
                  htmlFor="gallery-media"
                  className="w-full min-h-[360px] lg:min-h-[640px] flex flex-col items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-[58px] h-[58px] bg-[#D8D3D3] rounded-full flex items-center justify-center mb-[20px]">
                    <Plus size={38} className="text-white" />
                  </div>
                  <p className="text-[#D8D3D3] text-[30px] sailec-regular">Add New</p>
                </motion.label>
              )}

              <input
                id="gallery-media"
                type="file"
                hidden
                multiple
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
                name={imageRegister.name}
                ref={(el) => {
                  imageRegister.ref(el);
                  fileInputRef.current = el;
                }}
                onBlur={imageRegister.onBlur}
                onChange={handlePreview}
              />
            </motion.div>

            {errors.image && (
              <p className="text-red-500 text-sm mt-2 sailec-regular">
                {errors.image.message}
              </p>
            )}
          </div>

          <motion.div 
          variants={fadeUp}
          custom={0.38}
          className="bg-[#EEF6E8] px-[40px] py-[30px] flex flex-col justify-center"
          
          >
            <motion.input
              whileFocus={{ scale: 1.01 }}
              {...register('title', { required: 'Title is required' })}
              placeholder="Title"
              className="text-[48px] font-bold bg-transparent outline-none mb-2 sailec-bold"
            />
            {errors.title && <p className="text-red-500 text-sm mb-2 sailec-regular">{errors.title.message}</p>}

            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              {...register('description', { required: 'Description is required' })}
              placeholder="Description"
              className="bg-transparent outline-none mb-8 sailec-regular"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mb-4 sailec-regular">{errors.description.message}</p>
            )}

            <div className="space-y-6">
              <InfoInput icon={<Grid3X3 />} label="Material" register={register} errors={errors} />
              <InfoInput icon={<Palette />} label="Color" register={register} errors={errors} />
              <InfoInput icon={<Shapes />} label="Shape" register={register} errors={errors} />
              <InfoInput icon={<Ruler />} label="Size" register={register} errors={errors} />
              <InfoInput icon={<Weight />} label="Weight" register={register} errors={errors} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center mt-10 pb-10"
        variants={fadeUp}
        custom={0.5}
      >
        <motion.div whileHover={{ y: -2, scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Button
            title={loading ? "LOADING..." : "CONFIRM"}
            type="submit"
            className="bg-[#DDE58F] px-[24px] py-[9px] rounded-full"
            disabled={loading ? true : false}
          />
        </motion.div>
      </motion.div>
    </motion.form>

    <SuccessModal
      open={successOpen}
      onClose={() => handleCloseProductAdded()}
    />
    
    </>
  );
}

function InfoInput({ icon, label, register, errors }) {
  const fieldName = label.toLowerCase();

  return (
    <Tooltip>
      <motion.div
        className="flex items-center gap-[20px] text-[#167C71]"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <TooltipTrigger asChild>
          {React.cloneElement(icon, { size: 34 })}
        </TooltipTrigger>

        <input
          {...register(fieldName, {
            required: `${label} is required`,
          })}
          placeholder={label}
          className="bg-transparent outline-none w-full sailec-regular"
        />
      </motion.div>
      <TooltipContent side="bottom">
        <p className="sailec-regular">{label}</p>
      </TooltipContent>
      {errors[fieldName] && (
        <p className="text-red-500 text-sm mt-1 ml-[54px] sailec-regular">
          {errors[fieldName].message}
        </p>
      )}
    </Tooltip>
  );
}
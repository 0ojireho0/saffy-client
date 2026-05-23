'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';
import {
  Search,
  Plus,
  Grid3X3,
  Palette,
  Shapes,
  Ruler,
  Weight,
  ChevronLeft,
  ChevronRight,
  X,
  GalleryThumbnails,
} from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import useGalleries from '@/hooks/Admin/useGalleries';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { isProd } from '@/lib/axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useAuth } from '@/hooks/auth';

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
      staggerChildren: 0.08,
    },
  },
};

export default function EditGallery() {
  useAuth({
    middleware: 'auth',
  });

  const params = useParams();
  const { id } = params;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      product_id: '',
      category: '',
      image: null,
      title: '',
      description: '',
      material: '',
      color: '',
      shape: '',
      size: '',
      weight: '',
    },
  });

  const categoriesList = [
    { name: 'FASHION', value: 'fashion' },
    { name: 'GIFTS & PACKAGING', value: 'gifts' },
    { name: 'HOME & GARDEN', value: 'home' },
    { name: 'KITCHEN & DINING', value: 'kitchen' },
    { name: 'STATIONARIES & DESK ACCESSORIES', value: 'stationaries' },
    { name: 'SUPPORTED COMMUNITIES (GBP PRODUCTS)', value: 'supported' },
    { name: 'CHRISTMAS & HOLIDAYS', value: 'christmas' },
    { name: 'TOYS & GAMES', value: 'toys' },
  ];

  const { validateGallery, UpdateGallery } = useGalleries();

  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);

  const MAX_TOTAL_SIZE = 50 * 1024 * 1024;

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/quicktime',
  ];

  const baseUrl = isProd
    ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API
    : process.env.NEXT_PUBLIC_BACKEND_API;

  const fileInputRef = useRef(null);

  const [previews, setPreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchGallery = async () => {
      setLoading(true);
      setError('');

      const response = await validateGallery({
        id,
        setError,
      });

      if (response?.content) {
        setGallery(response.content);
      }

      setLoading(false);
    };

    fetchGallery();
  }, [id]);

  useEffect(() => {
    if (!gallery) return;

    reset({
      product_id: gallery.product_id || '',
      category: gallery.category?.toLowerCase() || '',
      image: null,
      title: gallery.title || '',
      description: gallery.description || '',
      material: gallery.material || '',
      color: gallery.color || '',
      shape: gallery.shape || '',
      size: gallery.size || '',
      weight: gallery.weight || '',
    });

    if (gallery.media?.length) {
      const existingPreviews = gallery.media.map((media) => ({
        url: media.media_url?.startsWith('/storage')
          ? `${baseUrl}${media.media_url}`
          : media.media_url || `${baseUrl}/storage/${media.media_path}`,
        type: media.media_type,
        existing: true,
      }));

      setPreviews(existingPreviews);

      const thumbIndex = gallery.media.findIndex((media) => media.is_thumbnail);
      setThumbnailIndex(thumbIndex >= 0 ? thumbIndex : 0);
      setCurrentMediaIndex(0);
    } else if (gallery.img_path) {
      setPreviews([
        {
          url: `${baseUrl}/storage/${gallery.img_path}`,
          type: 'image',
          existing: true,
        },
      ]);

      setThumbnailIndex(0);
      setCurrentMediaIndex(0);
    }
  }, [gallery, reset, baseUrl]);

  const hasChanges = (data, gallery) => {
    const currentCategory = gallery.category?.toLowerCase() || '';

    return !(
      data.category === currentCategory &&
      data.color === gallery.color &&
      data.description === gallery.description &&
      data.material === gallery.material &&
      data.product_id === gallery.product_id &&
      data.shape === gallery.shape &&
      data.size === gallery.size &&
      data.title === gallery.title &&
      data.weight === gallery.weight &&
      selectedFiles.length === 0
    );
  };

  const handleMediaChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const invalidFile = files.find((file) => !allowedTypes.includes(file.type));

    if (invalidFile) {
      Swal.fire({
        title: 'Invalid file type',
        text: 'Only JPG, PNG, WEBP, MP4, WEBM, and MOV files are allowed.',
        icon: 'warning',
      });

      event.target.value = '';
      return;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      Swal.fire({
        title: 'Files too large',
        text: 'Maximum total file size is 50MB.',
        icon: 'warning',
      });

      event.target.value = '';
      return;
    }

    const nextPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image',
      existing: false,
    }));

    previews.forEach((preview) => {
      if (preview.url?.startsWith('blob:')) {
        URL.revokeObjectURL(preview.url);
      }
    });

    setSelectedFiles(files);
    setPreviews(nextPreviews);
    setCurrentMediaIndex(0);
    setThumbnailIndex(0);
  };

  const handleDeletePreview = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentPreview = previews[currentMediaIndex];

    if (currentPreview?.existing) {
      Swal.fire({
        title: 'Existing media',
        text: 'To remove existing uploaded media, upload a new media set. This edit form replaces all media when new files are selected.',
        icon: 'info',
      });
      return;
    }

    if (currentPreview?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(currentPreview.url);
    }

    const updatedFiles = selectedFiles.filter((_, index) => index !== currentMediaIndex);
    const updatedPreviews = previews.filter((_, index) => index !== currentMediaIndex);

    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);

    const dataTransfer = new DataTransfer();

    updatedFiles.forEach((file) => {
      dataTransfer.items.add(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }

    if (thumbnailIndex === currentMediaIndex) {
      setThumbnailIndex(0);
    } else if (thumbnailIndex > currentMediaIndex) {
      setThumbnailIndex((prev) => prev - 1);
    }

    if (updatedPreviews.length === 0) {
      setCurrentMediaIndex(0);
      setThumbnailIndex(0);
    } else if (currentMediaIndex >= updatedPreviews.length) {
      setCurrentMediaIndex(updatedPreviews.length - 1);
    }
  };

  const onSubmit = async (data) => {
    if (!hasChanges(data, gallery)) {
      Swal.fire({
        title: 'No field changes',
        text: 'No changes in field, please try again.',
        icon: 'warning',
      });
      return;
    }

    const formData = new FormData();

    const currentCategory = gallery.category?.toLowerCase() || '';

    if (data.category !== currentCategory) {
      formData.append('category', data.category);
    }

    if (data.color !== gallery.color) {
      formData.append('color', data.color);
    }

    if (data.description !== gallery.description) {
      formData.append('description', data.description);
    }

    if (data.material !== gallery.material) {
      formData.append('material', data.material);
    }

    if (data.product_id !== gallery.product_id) {
      formData.append('product_id', data.product_id);
    }

    if (data.shape !== gallery.shape) {
      formData.append('shape', data.shape);
    }

    if (data.size !== gallery.size) {
      formData.append('size', data.size);
    }

    if (data.title !== gallery.title) {
      formData.append('title', data.title);
    }

    if (data.weight !== gallery.weight) {
      formData.append('weight', data.weight);
    }

    selectedFiles.forEach((file) => {
      formData.append('media[]', file);
    });

    if (selectedFiles.length > 0) {
      formData.append('thumbnail_index', thumbnailIndex);
    }

    setLoadingBtn(true);

    await UpdateGallery({
      formData,
      setLoading: setLoadingBtn,
      id: gallery?.id,
    });
  };

  if (loading) return <Loading text="Loading..." />;

  if (error) {
    return (
      <Error
        error={error}
        text="Go Back to Galleries"
        backPath="/admin/galleries"
      />
    );
  }

  return (
    <motion.div
      className="w-full bg-white"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div
        className="w-full max-w-[1180px] mx-auto flex flex-col md:flex-row justify-between items-start gap-5 px-5 sm:px-8 lg:px-0 pt-6"
        variants={fadeUp}
        custom={0}
      >
        <motion.div className="mb-6" whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
          <Link
            href="/admin/gallery"
            className="inline-flex items-center gap-1 tracking-wide text-[#227369] transition hover:opacity-80"
          >
            <ChevronLeft />
            <span className="text-[18px] md:text-[20px] helvetica-regular">
              BACK
            </span>
          </Link>
        </motion.div>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white px-5 sm:px-8 lg:px-0"
        variants={staggerContainer}
      >
        <motion.div
          className="w-full flex items-center justify-center"
          variants={fadeUp}
          custom={0.08}
        >
          <motion.h1
            className="helvetica-bold text-[#0B2A26] pt-[20px] sm:pt-[33px] pb-[40px] sm:pb-[60px] text-xl tracking-wide sm:text-2xl md:text-3xl"
            variants={fadeUp}
            custom={0.12}
          >
            EDIT GALLERY
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

              <motion.input
                {...register('product_id', {
                  required: 'Product ID is required',
                })}
                placeholder="PRODUCT ID"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
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

          <motion.div
            className="w-full"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Controller
              name="category"
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <div className="w-full">
                  <Select value={field.value || ''} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full sailec-regular">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {categoriesList.map((item) => (
                          <SelectItem
                            value={item.value}
                            key={item.value}
                            className="sailec-regular"
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1 sailec-regular">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              )}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full max-w-[1180px] mx-auto mt-[42px] rounded-[18px] bg-[#F1F1F1] p-[30px] sm:p-[46px]"
          variants={fadeUp}
          custom={0.26}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <motion.div variants={fadeUp} custom={0.32}>
              <motion.div
                className="relative flex min-h-[360px] lg:min-h-[640px] items-center justify-center overflow-hidden rounded-[12px] border border-dashed border-[#7F8B88]"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                {previews.length > 0 ? (
                  <>
                    <AnimatePresence mode="wait">
                      {previews[currentMediaIndex]?.type === 'video' ? (
                        <motion.video
                          key={previews[currentMediaIndex]?.url}
                          src={previews[currentMediaIndex].url}
                          controls
                          className="h-full w-full object-cover"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.25 }}
                        />
                      ) : (
                        <motion.img
                          key={previews[currentMediaIndex]?.url}
                          src={previews[currentMediaIndex]?.url}
                          alt={`Preview ${currentMediaIndex + 1}`}
                          className="h-full w-full object-cover"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.25 }}
                        />
                      )}
                    </AnimatePresence>

                    {previews[currentMediaIndex]?.type !== 'video' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            type="button"
                            whileHover={{ y: -2, scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setThumbnailIndex(currentMediaIndex);
                            }}
                            className={`absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full px-4 py-2 shadow-md border transition-all duration-200 sailec-regular text-sm ${
                              thumbnailIndex === currentMediaIndex
                                ? 'bg-[#DDE58F] border-[#0B2A26] text-[#0B2A26]'
                                : 'bg-white/85 border-white text-[#0B2A26] hover:bg-[#DDE58F]'
                            }`}
                          >
                            <GalleryThumbnails size={18} />
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="sailec-regular">
                            Used as main gallery image
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {!previews[currentMediaIndex]?.existing && (
                      <motion.button
                        type="button"
                        whileHover={{ y: -2, scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={handleDeletePreview}
                        className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow-md z-10"
                      >
                        <X size={24} className="text-[#0B2A26]" />
                      </motion.button>
                    )}

                    {previews.length > 1 && (
                      <>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.08, x: -2 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            setCurrentMediaIndex((prev) =>
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

                            setCurrentMediaIndex((prev) =>
                              prev === previews.length - 1 ? 0 : prev + 1
                            );
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10 cursor-pointer"
                        >
                          <ChevronRight size={28} className="text-[#0B2A26]" />
                        </motion.button>

                        <motion.div
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full sailec-regular"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {currentMediaIndex + 1} / {previews.length}
                        </motion.div>
                      </>
                    )}

                    <motion.label
                      htmlFor="gallery-media"
                      whileHover={{ y: -2, scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="absolute bottom-4 right-4 bg-white/80 rounded-full px-4 py-2 shadow-md cursor-pointer text-[#0B2A26] text-sm sailec-regular z-10"
                    >
                      Replace Media
                    </motion.label>
                  </>
                ) : (
                  <motion.label
                    htmlFor="gallery-media"
                    className="flex h-full min-h-[360px] lg:min-h-[640px] w-full cursor-pointer flex-col items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-[58px] h-[58px] bg-[#D8D3D3] rounded-full flex items-center justify-center mb-[20px]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Plus size={38} className="text-white" />
                    </motion.div>

                    <p className="text-[#D8D3D3] text-[30px] sailec-regular">
                      Add Media
                    </p>
                  </motion.label>
                )}

                <input
                  id="gallery-media"
                  type="file"
                  hidden
                  multiple
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
                  ref={fileInputRef}
                  onChange={handleMediaChange}
                />
              </motion.div>

              {errors.image && (
                <p className="text-red-500 text-sm mt-2 sailec-regular">
                  {errors.image.message}
                </p>
              )}
            </motion.div>

            <motion.div
              className="bg-[#EEF6E8] px-[40px] py-[30px] flex flex-col justify-center"
              variants={fadeUp}
              custom={0.38}
            >
              <motion.input
                {...register('title', {
                  required: 'Title is required',
                })}
                placeholder="Title"
                whileFocus={{ scale: 1.01 }}
                className="text-[48px] font-bold bg-transparent outline-none mb-2 sailec-bold"
              />

              {errors.title && (
                <p className="text-red-500 text-sm mb-2 sailec-regular">
                  {errors.title.message}
                </p>
              )}

              <motion.textarea
                {...register('description', {
                  required: 'Description is required',
                })}
                placeholder="Description"
                whileFocus={{ scale: 1.01 }}
                className="bg-transparent outline-none mb-8 sailec-regular"
              />

              {errors.description && (
                <p className="text-red-500 text-sm mb-4 sailec-regular">
                  {errors.description.message}
                </p>
              )}

              <motion.div
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <InfoInput
                  icon={<Grid3X3 />}
                  label="Material"
                  register={register}
                  errors={errors}
                />

                <InfoInput
                  icon={<Palette />}
                  label="Color"
                  register={register}
                  errors={errors}
                />

                <InfoInput
                  icon={<Shapes />}
                  label="Shape"
                  register={register}
                  errors={errors}
                />

                <InfoInput
                  icon={<Ruler />}
                  label="Size"
                  register={register}
                  errors={errors}
                />

                <InfoInput
                  icon={<Weight />}
                  label="Weight"
                  register={register}
                  errors={errors}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center mt-10 pb-10"
          variants={fadeUp}
          custom={0.5}
        >
          <motion.div
            whileHover={{ y: -2, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Button
              title={loadingBtn ? 'LOADING...' : 'CONFIRM'}
              type="submit"
              className="bg-[#DDE58F] px-[24px] py-[9px] rounded-full"
              disabled={loadingBtn}
            />
          </motion.div>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

function InfoInput({ icon, label, register, errors }) {
  const fieldName = label.toLowerCase();

  return (
    <Tooltip>
      <motion.div
        className="flex items-center gap-[20px] text-[#167C71]"
        variants={fadeUp}
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
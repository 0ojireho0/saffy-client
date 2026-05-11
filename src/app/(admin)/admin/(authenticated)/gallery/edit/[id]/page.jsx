'use client';

import React, { useEffect, useState } from 'react';
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
} from "@/components/ui/tooltip";


import useGalleries from '@/hooks/Admin/useGalleries';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { isProd } from '@/lib/axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useAuth } from '@/hooks/auth'

export default function EditGallery() {

  useAuth({
    middleware: 'auth',
  })

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
    {
      name: 'FASHION',
      value: 'fashion',
    },
    {
      name: 'GIFTS & PACKAGING',
      value: 'gifts',
    },
    {
      name: 'HOME & GARDEN',
      value: 'home',
    },
    {
      name: 'KITCHEN & DINING',
      value: 'kitchen',
    },
    {
      name: 'STATIONARIES & DESK ACCESSORIES',
      value: 'stationaries',
    },
    {
      name: 'SUPPORTED COMMUNITIES (GBP PRODUCTS)',
      value: 'supported',
    },
    {
      name: 'CHRISTMAS & HOLIDAYS',
      value: 'christmas',
    },
    {
      name: 'TOYS & GAMES',
      value: 'toys',
    },
  ];

  const { validateGallery, UpdateGallery } = useGalleries();

  const [gallery, setGallery] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);

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

    if (gallery.img_path) {
      setPreview(
        `${
          isProd
            ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API
            : process.env.NEXT_PUBLIC_BACKEND_API
        }/storage/${gallery.img_path}`
      );
    }
  }, [gallery, reset]);

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
      !(data.image instanceof File)
    );
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

    if (data.image instanceof File) {
      formData.append('image', data.image);
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
    <div>
      <div className="w-full max-w-[1180px] mx-auto flex flex-col md:flex-row justify-between items-start gap-5">
        <div className="mb-6">
          <Link
            href="/admin/gallery"
            className="inline-flex items-center gap-1 tracking-wide text-[#227369] transition hover:opacity-80"
          >
            <ChevronLeft />
            <span className="text-[18px] md:text-[20px] helvetica-regular">
              BACK
            </span>
          </Link>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white px-5 sm:px-8 lg:px-0"
      >
        <div className="w-full flex items-center justify-center">
          <h1 className="helvetica-bold text-[#0B2A26] pt-[40px] sm:pt-[53px] pb-[40px] sm:pb-[60px] text-xl tracking-wide sm:text-2xl md:text-3xl">
            EDIT GALLERY
          </h1>
        </div>

        <div className="w-full max-w-[1180px] mx-auto flex flex-col md:flex-row justify-between items-start gap-5">
          <div className="w-full md:max-w-[590px]">
            <div className="flex items-center gap-[14px]">
              <Search className="text-[#167C71]" size={32} />

              <input
                {...register('product_id', {
                  required: 'Product ID is required',
                })}
                placeholder="PRODUCT ID"
                className="w-full h-[42px] border border-[#167C71] rounded-[4px] px-[14px] sm:px-[16px]
                text-[16px] sm:text-[18px] text-[#0B2A26] placeholder:text-[#9E9E9E]
                outline-none focus:ring-1 focus:ring-[#167C71] helvetica-regular"
              />
            </div>

            {errors.product_id && (
              <p className="text-red-500 text-sm mt-1 ml-[46px] sailec-regular">
                {errors.product_id.message}
              </p>
            )}
          </div>

          <div className="w-full">
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
          </div>
        </div>

        <div className="w-full max-w-[1180px] mx-auto mt-[42px] rounded-[18px] bg-[#F1F1F1] p-[30px] sm:p-[46px]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <label className="relative flex min-h-[360px] lg:min-h-[640px] cursor-pointer items-center justify-center overflow-hidden rounded-[12px] border border-dashed border-[#7F8B88]">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        if (!file) return;

                        const allowedTypes = [
                          'image/jpeg',
                          'image/png',
                          'image/webp',
                        ];

                        if (!allowedTypes.includes(file.type)) {
                          Swal.fire({
                            title: 'Invalid file type',
                            text: 'Only JPG, PNG, and WEBP are allowed.',
                            icon: 'warning',
                          });

                          event.target.value = '';
                          return;
                        }

                        if (file.size > 2 * 1024 * 1024) {
                          Swal.fire({
                            title: 'File too large',
                            text: 'Max file size is 2MB.',
                            icon: 'warning',
                          });

                          event.target.value = '';
                          return;
                        }

                        field.onChange(file);

                        const nextPreview = URL.createObjectURL(file);

                        setPreview((previousPreview) => {
                          if (
                            previousPreview &&
                            previousPreview.startsWith('blob:')
                          ) {
                            URL.revokeObjectURL(previousPreview);
                          }

                          return nextPreview;
                        });
                      }}
                    />

                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-[58px] h-[58px] bg-[#D8D3D3] rounded-full flex items-center justify-center mb-[20px]">
                          <Plus size={38} className="text-white" />
                        </div>

                        <p className="text-[#D8D3D3] text-[30px] sailec-regular">
                          Add New
                        </p>
                      </div>
                    )}
                  </label>
                )}
              />

              {errors.image && (
                <p className="text-red-500 text-sm mt-2 sailec-regular">
                  {errors.image.message}
                </p>
              )}
            </div>

            <div className="bg-[#EEF6E8] px-[40px] py-[30px] flex flex-col justify-center">
              <input
                {...register('title', {
                  required: 'Title is required',
                })}
                placeholder="Title"
                className="text-[48px] font-bold bg-transparent outline-none mb-2 sailec-bold"
              />

              {errors.title && (
                <p className="text-red-500 text-sm mb-2 sailec-regular">
                  {errors.title.message}
                </p>
              )}

              <textarea
                {...register('description', {
                  required: 'Description is required',
                })}
                placeholder="Description"
                className="bg-transparent outline-none mb-8 sailec-regular"
              />

              {errors.description && (
                <p className="text-red-500 text-sm mb-4 sailec-regular">
                  {errors.description.message}
                </p>
              )}

              <div className="space-y-6">
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
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10 pb-10">
          <Button
            title={loadingBtn ? 'LOADING...' : 'CONFIRM'}
            type="submit"
            className="bg-[#DDE58F] px-[24px] py-[9px] rounded-full"
            disabled={loadingBtn}
          />
        </div>
      </form>
    </div>
  );
}

function InfoInput({ icon, label, register, errors }) {
  const fieldName = label.toLowerCase();

  return (
    <Tooltip>
      <div className="flex items-center gap-[20px] text-[#167C71]">
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
      </div>
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
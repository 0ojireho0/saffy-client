'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import { Search, Plus, Grid3X3, Palette, Shapes, Ruler, Weight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/auth'

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

import useGalleries from '@/hooks/Admin/useGalleries';
import SuccessModal from '@/components/Admin/Galleries/SuccessModal';

export default function AddGallery() {

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

  const { AddGallery } = useGalleries()

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false)

    const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (key === 'image') {
        formData.append('image', value[0]);
        } else {
        formData.append(key, value);
        }
    });

    await AddGallery({
        formData,
        reset,
        setLoading,
        setPreview,
        onSuccess: () => setSuccessOpen(true),
    });
    };

  const imageRegister = register('image', {
    validate: {
      isImage: (files) => {
        const file = files?.[0];

        if (!file) return 'Image is required';

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

        if (!allowedTypes.includes(file.type)) {
          return 'Only JPG, PNG, WEBP allowed';
        }

        if (file.size > 2 * 1024 * 1024) {
          return 'Max file size is 2MB';
        }

        return true;
      },
    },
  });

  const handlePreview = (e) => {
    imageRegister.onChange(e);

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed');
      e.target.value = '';
      setPreview(null);
      return;
    }

    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white px-5 sm:px-8 lg:px-0">
      <div className="w-full flex items-center justify-center">
        <h1 className="helvetica-bold text-[#0B2A26] text-[26px] sm:text-[32px] pt-[40px] sm:pt-[53px] pb-[40px] sm:pb-[60px]">
          GALLERY
        </h1>
      </div>

      <div className="w-full max-w-[1180px] mx-auto flex flex-col md:flex-row justify-between items-start gap-5">
        <div className="w-full md:max-w-[590px]">
          <div className="flex items-center gap-[14px]">
            <Search className="text-[#167C71]" size={32} />

            <input
              {...register('product_id', { required: 'Product ID is required' })}
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
      </div>

      <div className="w-full max-w-[1180px] mx-auto mt-[42px] rounded-[18px] bg-[#F1F1F1] p-[30px] sm:p-[46px]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            <label className="min-h-[360px] lg:min-h-[640px] border border-dashed border-[#7F8B88] rounded-[12px] flex flex-col items-center justify-center cursor-pointer overflow-hidden">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-[58px] h-[58px] bg-[#D8D3D3] rounded-full flex items-center justify-center mb-[20px]">
                    <Plus size={38} className="text-white" />
                  </div>
                  <p className="text-[#D8D3D3] text-[30px] sailec-regular">Add New</p>
                </>
              )}

              <input
                type="file"
                hidden
                accept="image/jpeg,image/png,image/webp"
                name={imageRegister.name}
                ref={imageRegister.ref}
                onBlur={imageRegister.onBlur}
                onChange={handlePreview}
              />
            </label>

            {errors.image && (
              <p className="text-red-500 text-sm mt-2 sailec-regular">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="bg-[#EEF6E8] px-[40px] py-[30px] flex flex-col justify-center">
            <input
              {...register('title', { required: 'Title is required' })}
              placeholder="Title"
              className="text-[48px] font-bold bg-transparent outline-none mb-2 sailec-bold"
            />
            {errors.title && <p className="text-red-500 text-sm mb-2 sailec-regular">{errors.title.message}</p>}

            <textarea
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
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 pb-10">
        <Button
          title={loading ? "LOADING..." : "CONFIRM"}
          type="submit"
          className="bg-[#DDE58F] px-[24px] py-[9px] rounded-full"
          disabled={loading ? true : false}
        />
      </div>
    </form>

    <SuccessModal
      open={successOpen}
      onClose={() => setSuccessOpen(false)}
    />
    
    </>
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
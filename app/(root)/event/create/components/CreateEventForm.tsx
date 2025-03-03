'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createEventSchema } from '@/utils/formSchemas/eventFormSchema'
import CustomInput from '@/components/ui/CustomInput'
import CustomTextarea from '@/components/ui/CustomTextarea'
import CustomSelect from '@/components/ui/CustomSelect'
import Button from '@/components/ui/Button'
import PreviewComponent from './PreviewComponent'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import MapComponent from './MapComponent'

const CreateEventForm = () => {
  const [previewImg, setPreviewImg] = useState(null)
  const [location, setLocation] = useState({})

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      isOnline: true,
    },
  })

  const isOnline = watch('isOnline')

  const onSubmit = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setPreviewImg(URL.createObjectURL(file))
      setValue('image', file)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* DESKTOP: LEFT SIDE - FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-dark p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl text-primary-light font-bold mb-6">
          Create Event
        </h1>

        {/* UPLOAD IMAGE LABEL */}
        <label className="relative block w-96 h-60 border-2 border-dashed border-primary-dark rounded-md cursor-pointer mx-auto">
          <input
            {...register('image')}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {previewImg ? (
            <Image
              src={previewImg}
              alt="Event image"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Upload Photo
            </div>
          )}
          {/* {errors?.image && (
          <p className="text-red-500 text-xs mt-10">{errors.image.message}</p>
        )} */}
        </label>

        {/* OTHERS FORM FIELDS */}
        <CustomInput
          control={control}
          name="title"
          label="Title"
          placeholder="Enter your title"
        />

        <CustomTextarea
          control={control}
          name="description"
          label="Description"
          placeholder="Short event description"
        />

        <CustomSelect
          control={control}
          name="category"
          label="Category"
          options={[
            { value: 'SPORTS', label: 'Sports' },
            { value: 'MUSIC', label: 'Music' },
            { value: 'TECH', label: 'Tech' },
            { value: 'GAMING', label: 'Gaming' },
          ]}
        />

        {/* FORM CHECKBOX */}
        <div>
          <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              {...register('isOnline')}
              // onChange={(e) => setIsOnline(e.target.checked)}
              className="w-5 h-5 rounded bg-dark text-primary-light"
            />
            Online Event?
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            control={control}
            name="points"
            label="Points"
            placeholder="Points amount"
            type="number"
          />

          <CustomInput
            control={control}
            name="membersLimit"
            label="Members Limit"
            placeholder="Max members"
            type="number"
          />
        </div>

        <Button
          label="Create Event"
          variant="primary"
          size="medium"
          type="submit"
        />
      </form>

      {/* DESKTOP: RIGHT SIDE - PREVIEW CARD AND MAP */}
      <div className="flex flex-col space-y-6">
        <PreviewComponent
          previewImg={previewImg}
          isOnline={isOnline}
          watch={watch}
        />

        {!isOnline && <MapComponent setLocation={setLocation} />}
      </div>
    </div>
  )
}

export default CreateEventForm

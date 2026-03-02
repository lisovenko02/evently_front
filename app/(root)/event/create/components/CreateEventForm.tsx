'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomInput from '@/components/ui/CustomInput'
import CustomTextarea from '@/components/ui/CustomTextarea'
import CustomSelect from '@/components/ui/Select/CustomSelect'
import Button from '@/components/ui/Button'
import PreviewComponent from './PreviewComponent'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import MapComponent from './MapComponent'
import { useCreateEventMutation } from '@/store/events/eventsApi'
import { Location } from '@/app/types/eventTypes'
import { useMediaQuery } from 'react-responsive'
import MapModal from './MapModal'
import { showErrorToast } from '@/utils/showErrorToast'
import {
  CreateEventFormValues,
  createEventSchema,
} from '@/utils/formSchemas/eventFormSchema'

const categoryOptions = [
  { value: 'SPORTS', label: 'Sports' },
  { value: 'MUSIC', label: 'Music' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'BUSINESS', label: 'Business' },
  { value: 'TECH', label: 'Technology' },
  { value: 'ART', label: 'Art' },
  { value: 'GAMING', label: 'Gaming' },
  { value: 'OTHER', label: 'Other' },
]

const visibilityOptions = [
  { value: 'OPEN', label: 'Open' },
  { value: 'CLOSED', label: 'Closed' },
  { value: 'PRIVATE', label: 'Private' },
]

const CreateEventForm = () => {
  const [previewImg, setPreviewImg] = useState<string | null>(null)
  const [location, setLocation] = useState<Location | null>(null)
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)

  const [createEvent, { isLoading }] = useCreateEventMutation()

  const isMobile = useMediaQuery({ maxWidth: 767 })
  console.log(isMobile)
  const { register, control, handleSubmit, setValue, watch } =
    useForm<CreateEventFormValues>({
      resolver: zodResolver(createEventSchema),
      defaultValues: {
        isOnline: true,
      },
    })

  const isOnline = watch('isOnline')

  useEffect(() => {
    if (!location || isOnline) return

    setValue('address', location?.address)
    setValue('city', location?.city)
    setValue('country', location?.country)
    setValue('latitude', location?.latitude)
    setValue('longitude', location?.longitude)
  }, [location, isOnline, setValue])

  const onSubmit = async (data: CreateEventFormValues) => {
    try {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return

        if (value instanceof File) {
          formData.append(key, value)
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          formData.append(key, String(value))
        } else {
          formData.append(key, value)
        }
      })

      await createEvent(formData).unwrap()
    } catch (error) {
      showErrorToast(error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file && file.type.startsWith('image/')) {
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

        {/* UPLOAD IMAGE INPUT */}
        <label className="relative block w-full h-60 border-2 border-dashed border-primary-dark rounded-md cursor-pointer mx-auto">
          <input
            {...register('image')}
            type="file"
            accept="image/*"
            className="hidden"
            aria-label="Upload event image"
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
        </label>

        {/* OTHERS FORM FIELDS */}
        <CustomInput
          control={control}
          name="title"
          label="Title"
          placeholder="Enter your title"
          required={true}
        />

        <CustomTextarea
          control={control}
          name="description"
          label="Description"
          placeholder="Short event description"
          required={true}
        />

        <div className="flex justify-between items-center">
          <CustomSelect
            control={control}
            name="category"
            label="Category"
            options={categoryOptions}
            required={true}
          />

          <CustomSelect
            control={control}
            name="visibility"
            label="Visibility"
            options={visibilityOptions}
            required={true}
          />
        </div>

        {/* FORM CHECKBOX */}
        <div>
          <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              {...register('isOnline')}
              className="w-5 h-5 rounded bg-dark text-primary-light"
            />
            Online Event?
            <strong className="text-red-600 ml-1">*</strong>
          </label>

          {!isOnline && (
            <button
              type="button"
              className="md:hidden px-3 py-1 bg-primary text-black rounded text-sm"
              onClick={() => setIsMapModalOpen(true)}
            >
              Choose Location
            </button>
          )}
        </div>

        {/* LOCATION INFO READONLY*/}
        {!isOnline && location && (
          <div>
            <label className="block text-gray-300">
              Event Location
              <strong className="text-red-600 ml-1">*</strong>
            </label>
            <p className="p-3 bg-dark border border-primary-dark rounded-md text-gray-400">
              {location?.address || 'No address selected'}
            </p>
          </div>
        )}

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
            name="maxParticipants"
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
          disabled={isLoading}
        />
      </form>
      {/* RIGHT: PREVIEW + MAP */}
      <div className="flex flex-col space-y-6">
        <PreviewComponent previewImg={previewImg} watch={watch} />

        {!isOnline && !isMobile && <MapComponent setLocation={setLocation} />}
      </div>

      {/* MAP MODAL (MOBILE) */}
      {isMapModalOpen && (
        <MapModal
          show={true}
          onClose={() => setIsMapModalOpen(false)}
          setLocation={setLocation}
        />
      )}
    </div>
  )
}

export default CreateEventForm

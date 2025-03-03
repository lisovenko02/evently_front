// 'use client'

// import { useState } from 'react'
// import CreateEventForm from './components/CreateEventForm'
// import PreviewComponent from './components/PreviewComponent'
// import MapComponent from './components/MapComponent'

// const CreateEvent = () => {
//   const [previewImg, setPreviewImg] = useState(null)
//   const [location, setLocation] = useState({})
//   const [isOnline, setIsOnline] = useState(true)
//   console.log('location', location)

//   return (
//     <div className="container mx-auto p-6 max-w-5xl">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* LEFT SIDE - FORM */}
//         <CreateEventForm
//           previewImg={previewImg}
//           setPreviewImg={setPreviewImg}
//           isOnline={isOnline}
//           setIsOnline={setIsOnline}
//           location={location}
//         />

//         {/* RIGHT SIDE - PREVIEW CARD AND MAP */}
//         <div className="flex flex-col space-y-6">
//           {/* PREVIEW CARD */}
//           <PreviewComponent previewImg={previewImg} isOnline={isOnline} />

//           {/* MAP */}
//           {!isOnline && <MapComponent setLocation={setLocation} />}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreateEvent

// import CustomTextarea from '@/components/ui/CustomTextarea'
// import CustomInput from '@/components/ui/CustomInput'
// import { useCreateEventMutation } from '@/store/events/eventsApi'
// import { createEventSchema } from '@/utils/formSchemas/eventFormSchema'
// import { zodResolver } from '@hookform/resolvers/zod'
// import Image from 'next/image'
// import React, { useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import CustomSelect from '@/components/ui/CustomSelect'
// import Button from '@/components/ui/Button'

// const CreateEventForm = ({
//   previewImg,
//   setPreviewImg,
//   isOnline,
//   setIsOnline,
//   location,
// }) => {
//   const [createEvent, { isLoading }] = useCreateEventMutation()

//   const {
//     register,
//     control,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(createEventSchema),
//   })

//   useEffect(() => {
//     if (!isOnline && location) {
//       setValue('city', location.city)
//       setValue('country', location.country)
//       setValue('latitude', location.latitude)
//       setValue('longitude', location.longitude)
//     }
//   }, [location, isOnline, setValue])

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData()

//       // Проходимо по всіх полях і кастимо значення
//       Object.entries(data).forEach(([key, value]) => {
//         if (key === 'image' && value instanceof File) {
//           formData.append(key, value)
//         } else if (typeof value === 'boolean' || typeof value === 'number') {
//           formData.append(key, JSON.stringify(value)) // Конвертуємо у string
//         } else {
//           formData.append(key, value)
//         }
//       })

//       console.log('FormData:', [...formData.entries()])
//       await createEvent(formData).unwrap()
//     } catch (error) {
//       // Potim na toast
//       console.log(error)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     console.log(previewImg)
//     if (file) {
//       setPreviewImg(URL.createObjectURL(file))
//       setValue('image', file)
//     }
//   }
//   console.log('errors', errors)
//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-5 bg-dark p-6 rounded-lg shadow-lg"
//     >
//       <h1 className="text-3xl text-primary-light font-bold mb-6">
//         Create Event
//       </h1>

//       {/* IMAGE UPLOAD */}
//       <label className="relative block w-96 h-60 border-2 border-dashed border-primary-dark rounded-md cursor-pointer mx-auto">
//         <input
//           {...register('image')}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleImageChange}
//         />

//         {previewImg ? (
//           <Image
//             src={previewImg}
//             alt="Event image"
//             layout="fill"
//             objectFit="cover"
//             className="rounded-md"
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-400">
//             Upload Photo
//           </div>
//         )}
//         {errors?.image && (
//           <p className="text-red-500 text-xs mt-10">{errors.image.message}</p>
//         )}
//       </label>

//       {/* OTHERS FORM FIELDS */}
//       <CustomInput
//         control={control}
//         name="title"
//         label="Title"
//         placeholder="Enter your title"
//       />

//       <CustomTextarea
//         control={control}
//         name="description"
//         label="Description"
//         placeholder="Short event description"
//       />

//       <CustomSelect
//         control={control}
//         name="category"
//         label="Category"
//         options={[
//           { value: 'SPORTS', label: 'Sports' },
//           { value: 'MUSIC', label: 'Music' },
//           { value: 'TECH', label: 'Tech' },
//           { value: 'GAMING', label: 'Gaming' },
//         ]}
//       />

//       <div>
//         <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
//           <input
//             type="checkbox"
//             {...register('isOnline')}
//             onChange={(e) => setIsOnline(e.target.checked)}
//             className="w-5 h-5 rounded bg-dark text-primary-light"
//           />
//           Online Event?
//         </label>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <CustomInput
//           control={control}
//           name="points"
//           label="Points"
//           placeholder="Points amount"
//           type="number"
//         />

//         <CustomInput
//           control={control}
//           name="membersLimit"
//           label="Members Limit"
//           placeholder="Max members"
//           type="number"
//         />
//       </div>

//       <Button
//         label="Create Event"
//         variant="primary"
//         size="medium"
//         type="submit"
//       />
//     </form>
//   )
// }

// export default CreateEventForm

// import Image from 'next/image'

// const PreviewComponent = ({ previewImg, isOnline }) => {
//   return (
//     <div className="bg-dark p-5 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-primary-light mb-4">Preview</h2>

//       <div className="border border-primary-dark rounded-lg shadow-lg overflow-hidden">
//         <div className="relative">
//           <Image
//             src={
//               previewImg ||
//               'https://events2025.s3.eu-north-1.amazonaws.com/5/7419562a-6582-4c93-853d-0a466f54c14e'
//             }
//             width={150}
//             height={150}
//             alt="Event preview"
//             className="w-full h-48 object-cover"
//           />
//           <div className="absolute top-0 left-0 bg-primary-dark bg-opacity-90 text-white p-2 text-xs font-semibold uppercase tracking-wide rounded-br-lg">
//             {isOnline ? 'Online' : 'Offline'}
//           </div>
//         </div>

//         <div className="p-5">
//           <h2 className="text-2xl font-bold text-primary-light mb-2">
//             Event title
//           </h2>
//           <p className="text-gray-300 mb-3">Event description</p>
//           <div className="flex justify-between items-center mt-3">
//             <span className="text-primary-light font-semibold text-sm uppercase tracking-wide">
//               27.02.2025
//             </span>
//             <span className="text-primary-dark font-semibold text-lg">
//               Points: {'0'}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PreviewComponent

// import Button from '@/components/ui/Button'
// import { useState } from 'react'

// const MapComponent = ({ setLocation }) => {
//   const [city, setCity] = useState('')
//   const [country, setCountry] = useState('')
//   const [latitude, setLatitude] = useState<number | null>(null)
//   const [longitude, setLongitude] = useState<number | null>(null)

//   const handleLocationChange = () => {
//     setLocation({
//       city,
//       country,
//       latitude: latitude || 0,
//       longitude: longitude || 0,
//     })
//   }

//   return (
//     <div className="bg-dark p-5 rounded-md shadow-md">
//       <h2 className="text-xl font-semibold text-primary-light">Location</h2>
//       <input
//         value={country}
//         onChange={(e) => setCountry(e.target.value)}
//         placeholder="Country"
//         className="w-full p-3 bg-dark border border-primary-dark rounded-md focus:ring-primary-light focus:outline-none mt-3"
//       />
//       <input
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         placeholder="City"
//         className="w-full p-3 bg-dark border border-primary-dark rounded-md focus:ring-primary-light focus:outline-none mt-3"
//       />

//       <div>
//         <div>MAP HERE</div>

//         <Button
//           label="Confirm location"
//           variant="primary"
//           size="medium"
//           type="submit"
//           onClick={handleLocationChange}
//         />
//       </div>
//     </div>
//   )
// }

// export default MapComponent

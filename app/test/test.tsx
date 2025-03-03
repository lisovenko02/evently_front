// 'use client'

// import { useState } from 'react'
// import CreateEventForm from './components/CreateEventForm'
// import MapComponent from './components/MapComponent'
// import MapModal from './components/MapModal'

// const CreateEvent = () => {
//   const [previewImg, setPreviewImg] = useState(null)
//   const [location, setLocation] = useState({})
//   const [isOnline, setIsOnline] = useState(true)
//   const [isMapOpen, setIsMapOpen] = useState(false)

//   return (
//     <div className="container mx-auto p-6 max-w-5xl">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* LEFT SIDE - FORM + PREVIEW */}
//         <CreateEventForm
//           previewImg={previewImg}
//           setPreviewImg={setPreviewImg}
//           isOnline={isOnline}
//           setIsOnline={setIsOnline}
//           location={location}
//           openMap={() => setIsMapOpen(true)}
//         />

//         {/* RIGHT SIDE - MAP (VISIBLE ONLY ON DESKTOP) */}
//         {!isOnline && (
//           <div className="hidden md:block">
//             <MapComponent setLocation={setLocation} />
//           </div>
//         )}
//       </div>

//       {/* MODAL MAP (VISIBLE ONLY ON MOBILE) */}
//       {!isOnline && <MapModal isOpen={isMapOpen} setIsOpen={setIsMapOpen} setLocation={setLocation} />}
//     </div>
//   )
// }

// export default CreateEvent

// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { createEventSchema } from '@/utils/formSchemas/eventFormSchema'
// import CustomInput from '@/components/ui/CustomInput'
// import CustomTextarea from '@/components/ui/CustomTextarea'
// import CustomSelect from '@/components/ui/CustomSelect'
// import Button from '@/components/ui/Button'
// import PreviewComponent from './PreviewComponent'
// import Image from 'next/image'
// import { useEffect } from 'react'

// const CreateEventForm = ({
//   previewImg,
//   setPreviewImg,
//   isOnline,
//   setIsOnline,
//   location,
//   openMap,
// }) => {
//   const {
//     register,
//     control,
//     handleSubmit,
//     setValue,
//     watch, // 👀 Відстежуємо зміни
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(createEventSchema),
//     defaultValues: {
//       isOnline: true,
//       title: '',
//       description: '',
//       category: '',
//     },
//   })

//   useEffect(() => {
//     if (!isOnline && location) {
//       setValue('city', location.city)
//       setValue('country', location.country)
//       setValue('latitude', location.latitude)
//       setValue('longitude', location.longitude)
//     }
//   }, [location, isOnline, setValue])

//   return (
//     <form
//       onSubmit={handleSubmit((data) => console.log('Submit:', data))}
//       className="space-y-5 bg-dark p-6 rounded-lg shadow-lg"
//     >
//       <h1 className="text-3xl text-primary-light font-bold mb-6">Create Event</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* FORM */}
//         <div className="space-y-5">
//           {/* IMAGE UPLOAD */}
//           <label className="relative block w-full h-40 border-2 border-dashed border-primary-dark rounded-md cursor-pointer">
//             <input
//               {...register('image')}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files?.[0]
//                 if (file) {
//                   setPreviewImg(URL.createObjectURL(file))
//                   setValue('image', file)
//                 }
//               }}
//             />
//             {previewImg ? (
//               <Image src={previewImg} alt="Event image" layout="fill" objectFit="cover" className="rounded-md" />
//             ) : (
//               <div className="flex items-center justify-center h-full text-gray-400">Upload Photo</div>
//             )}
//           </label>

//           <CustomInput control={control} name="title" label="Title" />
//           <CustomTextarea control={control} name="description" label="Description" />

//           <CustomSelect
//             control={control}
//             name="category"
//             label="Category"
//             options={[
//               { value: 'SPORTS', label: 'Sports' },
//               { value: 'MUSIC', label: 'Music' },
//               { value: 'TECH', label: 'Tech' },
//               { value: 'GAMING', label: 'Gaming' },
//             ]}
//           />

//           <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
//             <input
//               type="checkbox"
//               {...register('isOnline')}
//               onChange={(e) => setIsOnline(e.target.checked)}
//               className="w-5 h-5 rounded bg-dark text-primary-light"
//             />
//             Online Event?
//           </label>

//           {/* SELECT LOCATION BUTTON */}
//           {!isOnline && (
//             <button type="button" className="bg-primary-light text-dark py-2 px-4 rounded-md w-full" onClick={openMap}>
//               Select Location on Map
//             </button>
//           )}

//           <Button label="Create Event" variant="primary" size="medium" type="submit" />
//         </div>

//         {/* PREVIEW */}
//         <PreviewComponent previewImg={previewImg} isOnline={watch('isOnline')} />
//       </div>
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
//             src={previewImg || '/placeholder.jpg'}
//             width={150}
//             height={150}
//             alt="Event preview"
//             className="w-full h-48 object-cover"
//           />
//           <div className="absolute top-0 left-0 bg-primary-dark text-white p-2 text-xs font-semibold uppercase rounded-br-lg">
//             {isOnline ? 'Online' : 'Offline'}
//           </div>
//         </div>

//         <div className="p-5">
//           <h2 className="text-2xl font-bold text-primary-light mb-2">Event title</h2>
//           <p className="text-gray-300 mb-3">Event description</p>
//           <div className="flex justify-between items-center mt-3">
//             <span className="text-primary-light font-semibold text-sm uppercase">27.02.2025</span>
//             <span className="text-primary-dark font-semibold text-lg">Points: 0</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PreviewComponent

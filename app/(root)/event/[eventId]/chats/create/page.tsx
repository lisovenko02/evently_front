'use client'

import { useCreateGroupChatMutation } from '@/store/chat/chatApi'
import { useGetEventMembersQuery } from '@/store/events/eventsApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import ImageUpload from './components/ImageUpload'
import Button from '@/components/ui/Button'
import CustomInput from '@/components/ui/CustomInput'
import { ParticipantsSelect } from '@/components/ui/Select/ParticipantsSelect'
import { useAuthStore } from '@/store/auth/authStore'
import { showErrorToast } from '@/utils/showErrorToast'

const schema = z.object({
  name: z.string().min(1, 'Chat name is required'),
  participantIds: z.array(z.number()).min(1, 'Select at least 1 participant'),
  image: z.instanceof(File).optional(),
})

type FormValues = z.infer<typeof schema>

// const AVATAR_PLACEHOLDER =
//   'https://events2025.s3.eu-north-1.amazonaws.com/3/0c7330da-5a5d-4687-aa5a-28c089056f42'

const CreateGroupChat = () => {
  const { eventId } = useParams()
  const eventIdNumber = Number(eventId)
  // const isValidEventId = !Number.isNaN(eventIdNumber)

  const { user } = useAuthStore()

  const currentUserId = user?.id

  const [previewImg, setPreviewImg] = useState<string | null>(null)
  const [createGroupChat] = useCreateGroupChatMutation()
  const { data: participantsData, isLoading } = useGetEventMembersQuery({
    eventId: eventIdNumber,
    full: false,
  })

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()

    formData.append('eventId', String(eventId))
    formData.append('name', data.name)

    data.participantIds.forEach((id) =>
      formData.append('participantIds', String(id)),
    )

    if (data.image) formData.append('image', data.image)

    try {
      await createGroupChat({
        formData,
        eventId: eventIdNumber,
      }).unwrap()
      toast.success('Group chat created successfully')
    } catch (error) {
      showErrorToast(error)
    }
  }

  const participantOptions =
    participantsData
      ?.filter((user) => user.user.id !== currentUserId)
      .map((user) => ({
        value: user.id,
        label: `${user.user.username} (${user.role})`,
        avatar: user.user.avatar || '/wallpaper.jpg',
      })) || []

  const selectedIds = watch('participantIds')
  const selectedOptions = participantOptions.filter((opt) =>
    selectedIds?.includes(opt.value),
  )
  return (
    <div className="max-w-2xl mx-auto bg-dark p-6 rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl text-primary-light font-bold mb-6">
        Create Group Chat
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <ImageUpload
          previewImg={previewImg}
          onChange={(file) => {
            setPreviewImg(URL.createObjectURL(file))
            setValue('image', file)
          }}
        />

        <CustomInput
          control={control}
          name="name"
          label="Group Name"
          placeholder="Enter group chat name"
          required
        />

        <Controller
          control={control}
          name="participantIds"
          render={({ field }) => (
            <ParticipantsSelect
              options={participantOptions}
              value={selectedOptions}
              isLoading={isLoading}
              onChange={field.onChange}
              error={errors.participantIds?.message}
            />
          )}
        />

        <Button type="submit" label="Create" variant="primary" size="small" />
      </form>
    </div>
  )
}

export default CreateGroupChat

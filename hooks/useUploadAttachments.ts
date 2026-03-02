import { useUploadMessageFilesMutation } from '@/store/messages/messagesApi'

const useUploadAttachments = () => {
  const [uploadMessageFiles] = useUploadMessageFilesMutation()

  const uploadAttachments = async (
    files: File[],
    eventId: number,
    chatId: number,
  ) => {
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))
    formData.append('chatId', chatId.toString())
    formData.append('eventId', eventId.toString())

    try {
      const { data } = await uploadMessageFiles({ formData, eventId })
      console.log('data', data)
      return data?.attachments || []
    } catch (err) {
      console.error('Upload error', err)
      return []
    }
  }

  return { uploadAttachments }
}

export default useUploadAttachments

import { Location } from '@/app/types/eventTypes'
import { CreateEventFormValues } from '@/utils/formSchemas/eventFormSchema'
import { UseFormWatch } from 'react-hook-form'

export type MapModalProps = {
  setLocation: (location: Location) => void
  onClose: () => void
  show: boolean
}

export type PreviewComponentProps = {
  previewImg: string | null
  watch: UseFormWatch<CreateEventFormValues>
}

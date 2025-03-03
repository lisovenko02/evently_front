import toast from 'react-hot-toast'

export function showErrorToast(error: unknown): void {
  if (error && typeof error === 'object' && 'data' in error) {
    const typedError = error as { data: { message: string } }
    toast.error(`Failed: ${typedError.data.message}`)
  } else {
    toast.error('An unknown error occurred')
  }
}

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ImageUploadProps } from '../../types'

const ImageUpload = ({ previewImg, onChange }: ImageUploadProps) => {
  const [localPreview, setLocalPreview] = useState<string | null>(previewImg)

  useEffect(() => {
    setLocalPreview(previewImg)
  }, [previewImg])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setLocalPreview(URL.createObjectURL(file))
      onChange(file)
    }
  }

  return (
    <label className="relative block w-full h-48 border-2 border-dashed border-primary-dark rounded-md cursor-pointer overflow-hidden">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {localPreview ? (
        <Image
          src={localPreview}
          alt="Group chat image"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          Upload Chat Image
        </div>
      )}

      {localPreview && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-xs text-white px-2 py-1 rounded">
          Change Image
        </div>
      )}
    </label>
  )
}

export default ImageUpload

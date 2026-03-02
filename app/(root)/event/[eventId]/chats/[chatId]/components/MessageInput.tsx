'use client'

import { Paperclip, Send } from 'lucide-react'
import { useMemo } from 'react'
import clsx from 'clsx'
import { MessageInputProps } from '../../types'

const MessageInput = ({
  input,
  onInputChange,
  onSend,
  onFilesChange,
  files = [],
}: MessageInputProps) => {
  const fileCount = useMemo(() => files.length, [files])

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center gap-2 border border-gray-700 rounded-xl px-4 py-2 bg-accent-gray">
        {/* Attachment */}
        <label
          htmlFor="fileUpload"
          className="relative cursor-pointer text-gray-400 hover:text-gray-200"
        >
          <Paperclip size={20} />
          {fileCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {fileCount}
            </span>
          )}
          <input
            id="fileUpload"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                onFilesChange(Array.from(e.target.files))
              }
            }}
          />
        </label>

        {/* Input with embedded send icon */}
        <div className="relative flex-grow">
          <input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-accent-gray text-light border border-gray-700 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={onSend}
            className={clsx(
              'absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors'
            )}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* File names list (if any) */}
      {fileCount > 0 && (
        <div className="text-sm text-gray-400 mt-1">
          <span className="mr-1 text-gray-500">Downloaded:</span>
          {files.map((file, idx) => (
            <span key={idx} className="mr-2">
              {file.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default MessageInput

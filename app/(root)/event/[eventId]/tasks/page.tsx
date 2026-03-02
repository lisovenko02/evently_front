'use client'

import { useParams } from 'next/navigation'
import { useGetEventBoardQuery } from '@/store/board/boardApi'
import {
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnTitleMutation,
} from '@/store/column/columnApi'
import { useBackground } from './hooks/useBackground'
import { useRef, useState } from 'react'
import BackgroundSelector from './components/BackgroundSelector/BackgroundSelector'
import BoardScroller from './components/BoardScroller/BoardScroller'
import Column from './components/Column/Column'
import AddColumnForm from './components/forms/AddColumnForm'
import { showErrorToast } from '@/utils/showErrorToast'

export default function TasksPage() {
  const { eventId } = useParams()
  const {
    data: boardData,
    isLoading,
    refetch,
  } = useGetEventBoardQuery(Number(eventId))
  // Mutations
  const [createColumn] = useCreateColumnMutation()
  const [updateColumnTitle] = useUpdateColumnTitleMutation()
  const [deleteColumn] = useDeleteColumnMutation()

  // Custom hooks
  const { background, setBackground, backgrounds } = useBackground()

  const [isCreatingColumn, setIsCreatingColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const newColumnInputRef = useRef<HTMLInputElement>(null)

  const handleCreateColumn = async () => {
    if (!newColumnTitle.trim() || !boardData) return

    try {
      await createColumn({
        boardId: boardData.id,
        eventId: Number(eventId),
        data: { title: newColumnTitle },
      }).unwrap()

      refetch()

      setIsCreatingColumn(false)
      setNewColumnTitle('')
    } catch (error) {
      // potom
      showErrorToast(error)
    }
  }

  const handleUpdateColumnTitle = async (
    columnId: number,
    newTitle: string
  ) => {
    try {
      await updateColumnTitle({
        columnId,
        data: { title: newTitle },
        eventId: Number(eventId),
      }).unwrap()

      refetch()
    } catch (error) {
      // potom
      showErrorToast(error)
    }
  }

  const handleDeleteColumn = async (columnId: number) => {
    try {
      await deleteColumn({
        columnId,
        eventId: Number(eventId),
      })
      refetch()
    } catch (error) {
      showErrorToast(error)
    }
  }

  if (isLoading) return <div className="text-light p-4">Loading...</div>
  if (!boardData) return <div className="text-light p-4">No data found</div>

  return (
    <div
      className="relative flex flex-col h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: background ? `url(${background})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {background && (
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      )}

      <div className="relative z-10 flex flex-col h-full w-full pl-[var(--sidebar-width)]">
        <BackgroundSelector
          backgrounds={backgrounds}
          currentBackground={background}
          onSelect={setBackground}
        />

        <BoardScroller>
          {[...boardData.columns]
            .sort((a, b) => a.order - b.order)
            .map((column) => (
              <Column
                key={column.id}
                column={column}
                onUpdateTitle={handleUpdateColumnTitle}
                onDelete={handleDeleteColumn}
                refetch={refetch}
              />
            ))}

          <AddColumnForm
            isCreating={isCreatingColumn}
            title={newColumnTitle}
            onTitleChange={setNewColumnTitle}
            onSubmit={handleCreateColumn}
            onCancel={() => {
              setIsCreatingColumn(false)
              setNewColumnTitle('')
            }}
            inputRef={newColumnInputRef}
          />

          {!isCreatingColumn && (
            <button
              onClick={() => setIsCreatingColumn(true)}
              className="flex-shrink-0 w-72 mr-12 h-[calc(100vh-15rem)] flex items-center justify-center border-2 border-dashed border-white/40 text-white/70 rounded-2xl hover:bg-white/10 transition-colors"
            >
              + Add Column
            </button>
          )}
        </BoardScroller>
      </div>
    </div>
  )
}

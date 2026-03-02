import React from 'react'
import NameEditor from './NameEditor'
import AvatarUpload from './AvatarUpload'
import DeleteChatButton from './DeleteChatButton'
import { ChatDetailsDataProp } from '../../../../types'

const ModalHeader = ({ chatData }: ChatDetailsDataProp) => {
  return (
    <div className="flex items-center gap-4">
      <AvatarUpload chatData={chatData} />
      <NameEditor chatData={chatData} />
      {chatData.type === 'GROUP' && chatData.isCreator && (
        <DeleteChatButton chatData={chatData} />
      )}
    </div>
  )
}

export default ModalHeader

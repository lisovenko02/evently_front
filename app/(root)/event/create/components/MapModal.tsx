import Modal from '@/components/ui/Modal'
import React from 'react'
import MapComponent from './MapComponent'
import { MapModalProps } from '../types/createEventComponents.types'

const MapModal = ({ setLocation, onClose, show }: MapModalProps) => {
  return (
    <Modal onClose={onClose} show={show}>
      <MapComponent setLocation={setLocation} />
    </Modal>
  )
}

export default MapModal

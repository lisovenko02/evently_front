'use client'

import { memo, useMemo, useState } from 'react'
import { FaMapPin } from 'react-icons/fa'
import { WhereCardProps } from '../../_types/eventComponents.types'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const WhereCard = ({ location }: WhereCardProps) => {
  const [mapOpen, setMapOpen] = useState(false)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  const toggleMap = () => setMapOpen((prev) => !prev)

  const center = useMemo(
    () => ({
      lat: Number(location.coords.lat),
      lng: Number(location.coords.lng),
    }),
    [location.coords.lat, location.coords.lng],
  )

  return (
    <div className="bg-accent-gray2 rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-center gap-1 text-xs text-text-gray">
        <FaMapPin size={16} />
        Where
      </div>
      <h3 className="font-medium text-light">{location.address}</h3>
      <p className="text-xs text-text-gray">
        {location.city}, {location.country}
      </p>

      {location.coords && (
        <div className="mt-2 flex flex-col gap-2">
          <button
            className="text-xs text-primary hover:text-primary-dark font-medium flex items-center gap-1"
            onClick={toggleMap}
          >
            {mapOpen ? '▼ Hide map' : '▶ Show map'}
          </button>

          <div
            className={`transition-all duration-300 overflow-hidden ${
              mapOpen ? 'max-h-96' : 'max-h-0'
            } rounded-lg`}
          >
            {/* POTOM LOADER */}
            {mapOpen && isLoaded && (
              <div className="h-64 w-full">
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={{
                    lat: center.lat,
                    lng: center.lng,
                  }}
                  zoom={15}
                >
                  <Marker
                    position={{
                      lat: center.lat,
                      lng: center.lng,
                    }}
                  />
                </GoogleMap>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(WhereCard)

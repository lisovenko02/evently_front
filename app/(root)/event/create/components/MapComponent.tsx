import Button from '@/components/ui/Button'
import { useState } from 'react'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: 50.4501, // Координати Києва
  lng: 30.5234,
}

const MapComponent = ({ setLocation }) => {
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)

  const handleLocationChange = () => {
    setLocation({
      city,
      country,
      latitude: latitude || 0,
      longitude: longitude || 0,
    })
  }

  return (
    <div className="bg-dark p-5 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-primary-light">Location</h2>
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
        className="w-full p-3 bg-dark border border-primary-dark rounded-md focus:ring-primary-light focus:outline-none mt-3"
      />
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        className="w-full p-3 bg-dark border border-primary-dark rounded-md focus:ring-primary-light focus:outline-none mt-3"
      />

      <div>
        <div>
          {' '}
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>

        <Button
          label="Confirm location"
          variant="primary"
          size="medium"
          type="submit"
          onClick={handleLocationChange}
        />
      </div>
    </div>
  )
}

export default MapComponent

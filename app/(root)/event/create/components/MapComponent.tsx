import { Location } from '@/app/types/eventTypes'
import { showErrorToast } from '@/utils/showErrorToast'
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const mapContainerStyle = {
  width: '100%',
  height: '300px',
}

const mapDefaultCenter = {
  lat: 50.4501,
  lng: 30.5234,
}

interface MapComponentProps {
  setLocation: (location: Location) => void
}

const MapComponent = ({ setLocation }: MapComponentProps) => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>(
    mapDefaultCenter,
  )
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
    language: 'en',
  })

  // FUNCTIONS
  const parseAddressComponents = (
    components: google.maps.GeocoderAddressComponent[],
  ) => {
    let city = ''
    let country = ''

    components.forEach((component) => {
      console.log('component', component)

      if (component.types.includes('locality')) {
        city = component.long_name
      }
      if (component.types.includes('country')) {
        country = component.long_name
      }
    })

    return { city, country }
  }

  const fetchAddressDetails = async (lat: number, lng: number) => {
    setLoading(true)

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=en&region=UA`,
      )
      const data = await response.json()
      console.log('data', data)
      if (data.results[0]) {
        const address = data.results[0].formatted_address
        const { city, country } = parseAddressComponents(
          data.results[0].address_components,
        )

        return { address, city, country }
      }
      return { address: 'Address not found', city: '', country: '' }
    } catch (error) {
      showErrorToast(error)
      return { address: '', city: '', country: '' }
    } finally {
      setLoading(false)
    }
  }

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return

    const lat = e.latLng.lat()
    const lng = e.latLng.lng()

    try {
      const { address, city, country } = await fetchAddressDetails(lat, lng)
      setPosition({ lat, lng })
      setAddress(address)
      setLocation({ latitude: lat, longitude: lng, address, city, country })
    } catch (error) {
      showErrorToast(error)
    }
  }

  const handlePlaceSelect = async () => {
    if (!autoCompleteRef.current) return

    const place = autoCompleteRef.current.getPlace()

    if (place.geometry?.location) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()

      const address = place.formatted_address || ''
      console.log('place.address_components', place.address_components)
      const city =
        place.address_components?.find((c) => c.types.includes('locality'))
          ?.long_name || ''
      const country =
        place.address_components?.find((c) => c.types.includes('country'))
          ?.long_name || ''

      setPosition({ lat, lng })
      setAddress(address)
      setLocation({ latitude: lat, longitude: lng, address, city, country })
    }
  }

  if (!isLoaded) return <p>Loading map...</p>

  return (
    <div className="space-y-4">
      {/* Input searching place */}
      <Autocomplete
        onLoad={(ref: google.maps.places.Autocomplete) => {
          autoCompleteRef.current = ref
        }}
        onPlaceChanged={handlePlaceSelect}
        options={{
          fields: ['geometry', 'formatted_address', 'address_components'],
          types: ['establishment', 'geocode'],
        }}
      >
        <input
          type="text"
          placeholder="Search location..."
          className="w-full p-2 border rounded-md bg-dark text-light border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light"
          aria-label="Location search"
        />
      </Autocomplete>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={position}
        zoom={12}
        onClick={handleMapClick}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          clickableIcons: false,
        }}
      >
        <Marker position={position} />
      </GoogleMap>

      {/* Preview address */}
      <div className="text-light space-y-2">
        {loading && (
          <p className="text-sm text-primary-light animate-pulse">
            Loading address details...
          </p>
        )}
        {address && (
          <>
            <p className="truncate">
              <strong className="text-primary-light">Address:</strong> {address}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default MapComponent

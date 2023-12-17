import React, { useEffect, useState } from "react"

const useGeolocation = () => {
  const [location, setLocation] = useState({
    error: "true",
    coordinates: { lat: 0, lng: 0 },
  })

  const onError = () => {
    setLocation({
      error: "true",
      coordinates: { lat: 0, lng: 0 },
    })
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      onError()
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({
          error: "false",
          coordinates: { lat: latitude, lng: longitude },
        })
      },
      (error: any) => {
        return {
          error: error.message,
        }
      }
    )
  }, [])

  return location
}

export default useGeolocation

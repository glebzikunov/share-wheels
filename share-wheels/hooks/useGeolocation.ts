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

  // const [location, setLocation] = useState({
  //   loaded: false,
  //   coordinates: { latitude: "", longitude: "" },
  // })
  // const onSuccess = (location: any) => {
  //   setLocation({
  //     loaded: true,
  //     coordinates: {
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     },
  //   })
  // }
  // const onError = ({ loaded = true, error: any }) => {
  //   setLocation({
  //     error,
  //   })
  // }
  // useEffect(() => {
  //   if (!("geolocation" in navigator)) {
  //     onError({
  //       code: 0,
  //       message: "Geolocation is not supported!",
  //     })
  //   }
  //   navigator.geolocation.getCurrentPosition(onSuccess, onError)
  // }, [])

  return location
}

export default useGeolocation

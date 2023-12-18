"use client"

import { useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { mapStyles } from "@/constants"
import { formatAmount } from "@/lib/utils"
import useGeolocation from "@/hooks/useGeolocation"

interface Params {
  data: {
    _id: string
    mark: string
    model: string
    image: string
    latitude: string
    longitude: string
    rentalAmount: number
  }[]
}

function Map({ data }: Params) {
  const location = useGeolocation()
  const mapRef = useRef<HTMLDivElement>(null)
  const markers: google.maps.Marker[] = []

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      })

      const { Map } = await loader.importLibrary("maps")

      const position = {
        lat: 52.03221,
        lng: 29.22231,
      }

      // map options
      const mapOptions: google.maps.MapOptions = {
        center: location.error === "true" ? position : location.coordinates,
        zoom: 15,
        styles: mapStyles,
      }

      // setup map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

      markers.forEach((marker) => {
        marker.setMap(null)
      })

      markers.length = 0

      const infoWindow = new google.maps.InfoWindow()

      data.forEach((markerData) => {
        const marker = new google.maps.Marker({
          position: {
            lat: parseFloat(markerData.latitude),
            lng: parseFloat(markerData.longitude),
          },
          map,
          title: markerData.mark,
        })

        marker.addListener("click", () => {
          infoWindow.setContent(
            `<div style="max-width: 150px;">
              <a href="/vehicles/${markerData._id}" style="position: relative;">
                <Image
                  src="${markerData.image}"
                  alt="Vehicle Image"
                  style="width: 100%;"
                />
              </a>
              <div style="margin-top: 10px; display: flex; flex-direction: column;">
                <p>${markerData.mark}</p>
                <p>${markerData.model}</p>
                <p>${formatAmount(markerData.rentalAmount)}</p>
              </div>
            </div>
            `
          )
          infoWindow.open(map, marker)
        })

        markers.push(marker)
      })
    }

    initMap()
  }, [data, location.coordinates])

  return <div className="mt-5 w-full h-[500px] rounded-lg" ref={mapRef} />
}

export default Map

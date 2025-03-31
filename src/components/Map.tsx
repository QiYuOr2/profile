import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { useEffect, useRef } from 'react'

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN

export function MapBox() {
  const mapContainer = useRef(null!)
  const marker = useRef(null!)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12", // Replace with your preferred map style
      center: [120.2275, 30.2339],
      zoom: 7,
      interactive: false,
      attributionControl: false, 
    })

    map.addControl(new MapboxLanguage({
      defaultLanguage: 'zh-Hans'
    }))

    new mapboxgl.Marker({ element: marker.current })
    .setLngLat([120.2275, 30.2339])
    .addTo(map)

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div className='relative w-full h-full'>
      <div ref={mapContainer} className='w-full h-full'></div>
      <div ref={marker} className='w-4 h-4 rounded-full bg-blue-400 border-3 border-white border-solid shadow-md'></div>
      <div className='absolute bottom-2 left-2 z-50 text-xs bg-light-100 bg-opacity-70 px-2 py-1 rounded-full'>现居 杭州市</div>
    </div>
  )
}
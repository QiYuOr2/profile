import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useRef } from 'react'

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN

export function MapBox() {
  const marker = useRef(null!)



  return (
    <div className='relative w-full h-full'>
      <img src="https://api.qiyuor2.me/mapbox/area?lon=120.2275&lat=30.2339&zoom=7&w=400&h=400" className='w-350px absolute-center' />
      <div ref={marker} className='absolute-center w-4 h-4 rounded-full bg-blue-400 border-3 border-white border-solid shadow-md'></div>
      <div className='absolute bottom-2 left-2 z-50 text-xs bg-light-100 bg-opacity-70 px-2 py-1 rounded-full'>现居 杭州市</div>
    </div>
  )
}

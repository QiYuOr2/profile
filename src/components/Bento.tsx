import { ParallaxLayer } from "@react-spring/parallax"
import { PageProps } from "../types"

export function Bento({ offset }: PageProps) {
  const boxClassName = 'rounded-lg shadow-md bg-white border border-gray-200 bento'

  const BlogCard = () => (
    <a href='//blog.qiyuor2.me' target="_blank" className='block text-black decoration-none py-2.5 px-3.5'>
      <div className='font-bold text-lg'>博客</div>
      <div className='flex items-center text-sm rounded bg-zinc-50 py-0.6 px-1 absolute bottom-3 right-4 hover:bg-zinc-100'>
        <div>去看看</div>
        <div className="i-mdi:arrow-top-right-thick"></div>
      </div>
    </a>
  )

  return (
    <>
      <ParallaxLayer offset={offset}>
        <div className='grid grid-rows-[repeat(7,_5rem)] grid-cols-[repeat(8,_5rem)] gap-6 justify-center'>
          <div className={`${boxClassName}`} style={{ '--bento-lg': '1 / 1 / 5 / 3' }}>卡片1</div>
          <div className={`${boxClassName}`} style={{ '--bento-lg': '1 / 3 / 3 / 5' }}>卡片2</div>
          <div className={`${boxClassName} bg-no-repeat bg-cover bg-right`} style={{ '--bento-lg': '1 / 5 / 3 / 9', backgroundImage: "url('//cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20250319uji2.jpg')" }}></div>
          <div className={`${boxClassName}`} style={{ '--bento-lg': '3 / 3 / 6 / 7' }}>卡片4</div>
          <div className={`${boxClassName}`} style={{ '--bento-lg': '5 / 1 / 8 / 3' }}>卡片5</div>
          <div className={`${boxClassName}`} style={{ '--bento-lg': '3 / 7 / 5 / 9' }}>卡片6</div>
          <div className={`${boxClassName}`} style={{ '--bento-lg': '6 / 3 / 8 / 7' }}>卡片7</div>
          <div className={`${boxClassName} cursor-pointer relative  hover:scale-110 transition-all duration-300`} style={{ '--bento-lg': '5 / 7 / 6 / 9' }}>
            <BlogCard />
          </div>
          <div className={`${boxClassName}`} style={{ '--bento-lg': '6 / 7 / 8 / 9' }}>卡片9</div>
        </div>
      </ParallaxLayer>
    </>
  )
}
import { ParallaxLayer } from "@react-spring/parallax"
import { PageProps } from "../../types"
import { useEffect, useRef } from "react"
import { PROFILE } from "../../constants"
import { ParallaxCard } from "../ParallaxCard"
import { MapBox } from "./Map"
import { Skills } from "./Skills"
import { Education } from "./Education"
import { Blog } from "./Blog"
import { Contact } from "./Contact"

interface BentoProps extends PageProps {
  onAvatarVisible: (isVisible: boolean) => void
}

export function Bento({ offset, onAvatarVisible }: BentoProps) {

  const avatarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = avatarRef.current

    const avatarObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        onAvatarVisible(entry.isIntersecting)
      })
    }, { threshold: 0.2 })

    if (target) {
      avatarObserver.observe(target)
    }

    return () => {
      if (target) {
        avatarObserver.unobserve(target)
      }
    }
  }, [onAvatarVisible])

  return (
    <>
      <ParallaxLayer offset={offset} speed={0.5}>
        <div className='grid grid-rows-[repeat(7,_5rem)] grid-cols-[repeat(8,_5rem)] gap-6 justify-center pt-40'>
          <div className='bento-box bento' style={{ '--bento-lg': '1 / 1 / 5 / 3' }}>卡片1</div>
          <div className='bento-box bento' style={{ '--bento-lg': '1 / 3 / 3 / 5' }}>
            <Education />
          </div>
          <div className='bento-box bento bg-no-repeat bg-cover bg-right' style={{ '--bento-lg': '1 / 5 / 3 / 9', backgroundImage: "url('//cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20250319uji2.jpg')" }}></div>
          <ParallaxCard className='bento-box bento' style={{ '--bento-lg': '3 / 3 / 6 / 7' }}>
            <div className="p-4"></div>
          </ParallaxCard>
          <div className='bento-box bento overflow-hidden' style={{ '--bento-lg': '5 / 1 / 8 / 3' }}>
            <MapBox />
          </div>
          <div className='bento-box bento' style={{ '--bento-lg': '3 / 7 / 5 / 9' }}>
            <Contact />
          </div>
          <div className='bento-box bento' style={{ '--bento-lg': '6 / 3 / 8 / 7' }}>
            <Skills />
          </div>
          <div className='bento-box bento cursor-pointer relative  hover:scale-110 transition-all duration-300' style={{ '--bento-lg': '5 / 7 / 6 / 9' }}>
            <Blog />
          </div>
          <div ref={avatarRef} className='bento-box bento flex justify-center items-center overflow-hidden p-2 bg-yellow-900' style={{ '--bento-lg': '6 / 7 / 8 / 9' }}>
            <img src={PROFILE.Avatar} alt="avatar" className="w-full h-full rounded" />
          </div>
        </div>
      </ParallaxLayer>
    </>
  )
}

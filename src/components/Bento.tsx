import { ParallaxLayer } from "@react-spring/parallax"
import { PageProps } from "../types"
import { useEffect, useRef } from "react"
import { PROFILE } from "../constants"
import dayjs from 'dayjs'

interface BentoProps extends PageProps {
  onAvatarVisible: (isVisible: boolean) => void
}

function BlogCard() {
  return (
    <a href='//blog.qiyuor2.me' target="_blank" className='block text-black decoration-none py-2.5 px-3.5'>
      <div className='font-bold text-lg'>个人博客</div>
      <div className='flex items-center text-sm rounded-full bg-zinc-100 py-1 pl-2 pr-1.5 absolute bottom-3 right-4 hover:bg-zinc-200 transition-colors duration-200'>
        <div>去看看</div>
        <i className="i-mdi:arrow-top-right-thick"></i>
      </div>
    </a>
  )
}

function Skills() {
  const diff = dayjs().diff(dayjs(PROFILE.StartTime), 'year')

  const skillIcons = ['i-ri:html5-line', 'i-ri:css3-line', 'i-proicons:javascript', 'i-proicons:typescript', 'i-ri:reactjs-line', 'i-ri:vuejs-line', 'i-ri:nodejs-line', 'i-ri:tailwind-css-line', 'i-ri:mini-program-line', 'i-proicons:webpack', 'i-ri:npmjs-line', 'i-proicons:visual-studio-code', 'i-ri:chrome-line', 'i-ri:openai-fill', 'i-proicons:linux', 'i-ri:apple-line', 'i-ri:windows-line', 'i-ri:github-line',]

  return (
    <div className="box-border p-8 h-full flex flex-col justify-between relative overflow-hidden">
      <div className="absolute right--5 bottom--8 text-8em font-bold color-transparent text-stroke-6 text-stroke-hex-aaa op10">Skills</div>
      <div className="text-xl font-bold">前端从业 {diff} 年</div>
      <div className="flex w-3/4 flex-wrap gap-2 text-xl">
        {skillIcons.map(icon => <i className={`${icon} inline-block`}></i>)}
      </div>
    </div>
  )
}

function Education() {
  return (
    <div className="relative p-4 flex justify-end font-bold text-xl overflow-hidden">
      <div className="absolute text-4em left-1 bottom-7">🎓</div>
      <div className="[writing-mode:vertical-rl] mr-2">软件工程</div>
      <div className="[writing-mode:vertical-rl]">2022 届 ● 本科</div>
    </div>
  )
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
        <div className='grid grid-rows-[repeat(7,_5rem)] grid-cols-[repeat(8,_5rem)] gap-6 justify-center'>
          <div className='bento-box bento' style={{ '--bento-lg': '1 / 1 / 5 / 3' }}>卡片1</div>
          <div className='bento-box bento' style={{ '--bento-lg': '1 / 3 / 3 / 5' }}>
            <Education />
          </div>
          <div className='bento-box bento bg-no-repeat bg-cover bg-right' style={{ '--bento-lg': '1 / 5 / 3 / 9', backgroundImage: "url('//cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20250319uji2.jpg')" }}></div>
          <div className='bento-box bento' style={{ '--bento-lg': '3 / 3 / 6 / 7' }}>视差效果 & 简单的编辑器窗口样式</div>
          <div className='bento-box bento' style={{ '--bento-lg': '5 / 1 / 8 / 3' }}>地理位置/ 3D 地球</div>
          <div className='bento-box bento' style={{ '--bento-lg': '3 / 7 / 5 / 9' }}>联系方式</div>
          <div className='bento-box bento' style={{ '--bento-lg': '6 / 3 / 8 / 7' }}>
            <Skills />
          </div>
          <div className='bento-box bento cursor-pointer relative  hover:scale-110 transition-all duration-300' style={{ '--bento-lg': '5 / 7 / 6 / 9' }}>
            <BlogCard />
          </div>
          <div ref={avatarRef} className='bento-box bento flex justify-center items-center overflow-hidden p-2 bg-yellow-900' style={{ '--bento-lg': '6 / 7 / 8 / 9' }}>
            <img src={PROFILE.Avatar} alt="avatar" className="w-full h-full rounded" />
          </div>
        </div>
      </ParallaxLayer>
    </>
  )
}

import { ParallaxLayer, Parallax, IParallax } from '@react-spring/parallax'
import { useEffect, useRef, useState } from 'react';
import { PROFILE } from './constants';
import { FloatingStep } from './components/FloatingStep';
import { useThrottledState } from '@react-hookz/web'
import { useInterpolatedStyles } from './hooks/useInterpolatedStyles';

interface PageProps {
  offset: number
}

function Bento({ offset }: PageProps) {
  return (
    <>
      <ParallaxLayer offset={offset}>
        便当式个人信息
      </ParallaxLayer>
    </>
  )
}

function Experience({ offset }: PageProps) {
  return (
    <>
      <ParallaxLayer offset={offset}>
        工作经验/项目经验
      </ParallaxLayer>
    </>
  )
}


export default function App() {
  const parallax = useRef<IParallax>(null!);

  const [currentStep, setCurrentStep] = useThrottledState(0, 500)

  const scrollTo = (to: number) => {
    if (!parallax.current) {
      return
    }
    parallax.current.scrollTo(to)
  }

  const avatarRef = useRef<HTMLDivElement>(null)
  const [basicStyle, setBasicStyle] = useState({ width: 0, height: 0, left: 0, top: 0 })
  const [avatarStyle, setAvatarStyle] = useState({ width: 0, height: 0, left: 0, top: 0 })

  useEffect(() => {
    if (avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setBasicStyle({
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      })
    }

  }, [])


  const computedCurrentStep = () => {
    const containerHeight = parallax.current.container.current.clientHeight
    const scrollTop = parallax.current.container.current.scrollTop

    setCurrentStep(Math.round(scrollTop / containerHeight))
  }

  
  const computedAvatarStyle = () => {
    const scrollTop = parallax.current.container.current.scrollTop
    if (avatarRef.current) {

      const target = {
        width: 50,
        height: 50,
        left: 50,
        top: 50,
      }

      const progress = Math.min(1, scrollTop / basicStyle.top);

      setAvatarStyle({
        width: basicStyle.width + progress * (target.width - basicStyle.width),
        height: basicStyle.height + progress * (target.height - basicStyle.height),
        left: basicStyle.left + progress * (target.left - basicStyle.left),
        top: basicStyle.top + progress * (target.top - basicStyle.top)
      })
    }
  }



  useEffect(() => {
    parallax.current?.container.current.addEventListener('scroll', computedCurrentStep)
    parallax.current?.container.current.addEventListener('scroll', computedAvatarStyle)

    return () => {
      parallax.current?.container.current.removeEventListener('scroll', computedCurrentStep)
      parallax.current?.container.current.removeEventListener('scroll', computedAvatarStyle)
    }
  }, [basicStyle])

  const avatarTargetRef = useRef<HTMLDivElement>(null)

  useInterpolatedStyles({
    element: avatarRef,
    target: avatarTargetRef
  })

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div ref={avatarTargetRef} className='fixed left-5 top-5 w-10 h-10'></div>
        <div
          ref={avatarRef}
          className='w-20 h-20 rounded-full shadow-md overflow-hidden'
          style={avatarStyle.width ? { ...avatarStyle, position: 'fixed', 'zIndex': 100 } : {}}
        >
          <img className='w-full h-full ' src={PROFILE.Avatar} alt="avatar" />
        </div>
      </div>

      <Parallax ref={parallax} pages={3} style={{ top: '0', left: '0' }}>
        <Bento offset={1} />
        <Experience offset={2} />
      </Parallax >

      <FloatingStep step={3} currentStep={currentStep} toNextStep={scrollTo} />
    </>
  )
}

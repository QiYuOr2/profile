import { ParallaxLayer, Parallax, IParallax } from '@react-spring/parallax'
import { useRef } from 'react';
import { PROFILE } from './constants';
import { FloatingStep } from './components/FloatingStep';

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

  const scroll = (to: number) => {
    if (!parallax.current) {
      return
    }

    parallax.current.scrollTo(to)
  }

  return (
    <>
      <Parallax ref={parallax} pages={3} style={{ top: '0', left: '0', width: '100%', height: '100%' }}>
        <ParallaxLayer speed={-0.2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>

          <img src={PROFILE.Avatar} alt="avatar" className='w-20 h-20 rounded-full shadow-md' />
        </ParallaxLayer>
        <Bento offset={1} />
        <Experience offset={2} />
      </Parallax >

      <FloatingStep step={3} toNextStep={scroll} />
    </>
  )
}

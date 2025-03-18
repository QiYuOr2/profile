import { ParallaxLayer, Parallax, IParallax } from '@react-spring/parallax'
import { useEffect, useRef } from 'react';
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
  const [currentStep, setCurrentStep] = useThrottledState(0, 500);
  const avatarRef = useRef<HTMLDivElement>(null);
  const avatarTargetRef = useRef<HTMLDivElement>(null);

  const scrollTo = (to: number) => {
    if (!parallax.current) return;
    parallax.current.scrollTo(to);
  };

  useEffect(() => {
    const scrollContainer = parallax.current?.container.current;
    if (!scrollContainer) return;

    const computedCurrentStep = () => {
      const containerHeight = parallax.current.container.current.clientHeight;
      const scrollTop = parallax.current.container.current.scrollTop;
      
      setCurrentStep(Math.round(scrollTop / containerHeight));
    };

    scrollContainer.addEventListener('scroll', computedCurrentStep);
    return () => scrollContainer.removeEventListener('scroll', computedCurrentStep);
  }, [setCurrentStep]);

  const { elementStyle } = useInterpolatedStyles({
    element: avatarRef,
    target: avatarTargetRef,
    parallax
  });

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div ref={avatarTargetRef} className='fixed left-5 top-5 w-10 h-10'></div>
        <div
          ref={avatarRef}
          className='w-20 h-20 rounded-full shadow-md overflow-hidden'
          style={elementStyle.width ? { ...elementStyle, position: 'fixed', zIndex: 100 } : {}}
        >
          <img className='w-full h-full' src={PROFILE.Avatar} alt="avatar" />
        </div>
      </div>

      <Parallax ref={parallax} pages={3} style={{ top: '0', left: '0' }}>
        <Bento offset={1} />
        <Experience offset={2} />
      </Parallax>

      <FloatingStep step={3} currentStep={currentStep} toNextStep={scrollTo} />
    </>
  );
}

import { ParallaxLayer, Parallax, IParallax } from '@react-spring/parallax'
import { useEffect, useRef, useState } from 'react';
import { PROFILE } from './constants';
import { FloatingStep } from './components/FloatingStep';
import { useThrottledState } from '@react-hookz/web'
import { useInterpolatedStyles } from './hooks/useInterpolatedStyles';
import { PageProps } from './types';
import { Bento } from './components/Bento';



function Experience({ offset }: PageProps) {
  return (
    <>
      <ParallaxLayer offset={offset}>
        项目经验
      </ParallaxLayer>
    </>
  )
}

export default function App() {
  const parallax = useRef<IParallax>(null!);
  const [currentStep, setCurrentStep] = useThrottledState(0, 500);


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

  //#region  Avatar Transition
  const avatarRef = useRef<HTMLDivElement>(null);
  const avatarTargetRef = useRef<HTMLDivElement>(null);

  const { elementStyle } = useInterpolatedStyles({
    element: avatarRef,
    target: avatarTargetRef,
    parallax
  });

  const [isAvatarVisible, setIsAvatarVisible] = useState(true)
  const onBentoAvatarVisible = (isVisible: boolean) => {
    console.log(isVisible)
    setIsAvatarVisible(!isVisible)
  };
  //#endregion

  return (
    <>
      <div className='flex items-center justify-center min-h-screen'>
        <div ref={avatarTargetRef} className='fixed left-8 top-8 w-10 h-10'></div>
        <div
          ref={avatarRef}
          className={`w-20 h-20 rounded-full shadow-md overflow-hidden ${isAvatarVisible ? '' : 'opacity-0'} transition-opacity duration-300`}
          style={elementStyle.width ? { ...elementStyle, position: 'absolute', zIndex: 100 } : {}}
        >
          <img className='w-full h-full' src={PROFILE.Avatar} alt="avatar" />
        </div>
      </div>

      <Parallax ref={parallax} pages={3} style={{ top: '0', left: '0' }}>
        <Bento offset={1} onAvatarVisible={onBentoAvatarVisible} />
        <Experience offset={2} />
      </Parallax>

      <FloatingStep step={3} currentStep={currentStep} toNextStep={scrollTo} />
    </>
  );
}

import { useEffect, useRef, useState } from "react";

interface ParallaxCardProps {
  children: React.ReactNode | React.ReactNode[]
  style?: React.CSSProperties
  className?: string
}

const MAX_ROTATE = 20;

export function ParallaxCard({ children, className, style }: ParallaxCardProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animation: number;
    const target = parallaxRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!target) {
        return;
      }
      const rect = target.getBoundingClientRect();

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      animation = requestAnimationFrame(() => {
        setRotate({
          x: MAX_ROTATE * (centerY - offsetY) / centerY,
          y: MAX_ROTATE * (centerX - offsetX) / centerX,
        })
      })
    }

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 })
    }

    target?.addEventListener('mousemove', handleMouseMove);
    target?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      target?.removeEventListener('mousemove', handleMouseMove);
      target?.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animation);
    }
  }, [])

  return (
    <>
      <div
        ref={parallaxRef}
        style={{
          ...style,
          '--parallax-offset': 1,
          '--parallax-rotateX': rotate.x,
          '--parallax-rotateY': rotate.y,
          '--max-rotate': MAX_ROTATE
        }}
        className={`${className} parallax-card parallax-card duration-300`}
      >
        {
          ((Array.isArray(children) ? children : [children])
            .map((child, index) => (
              <div
                key={index}
                className="parallax-card--3d w-full h-full"
                style={{
                  '--parallax-offset': (index + 1) * 1.5
                }}
              >
                {child}
              </div>
            )))
        }
      </div>
    </>
  )
}

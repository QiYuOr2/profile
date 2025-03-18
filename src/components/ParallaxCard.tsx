interface ParallaxCardProps {
  children: React.ReactNode
}

const MAX_ROTATE = 20;

export function ParallaxCard({children}: ParallaxCardProps) {

  return (
    <>
      <div>
        {children}
      </div>
    </>
  )
}
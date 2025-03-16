interface Props {
  step: number
  currentStep: number
  toNextStep: (to: number) => void
}

export function FloatingStep({ step, currentStep, toNextStep }: Props) {

  const handleClick = (index: number) => {
    toNextStep(index)
  }

  return (
    <div className='fixed bottom-5 left-1/2 -translate-x-1/2 m-auto flex items-center gap-2'>
      {new Array(step).fill(0).map((_, i) => (
        <div
          key={i}
          className={`w-8 h-2 shadow rounded-lg cursor-pointer ${currentStep === i ? 'bg-gray-900' : 'bg-white'} transition-colors duration-250 ease-in-out`}
          onClick={() => handleClick(i)}
        ></div>)
      )}
    </div>
  )
}
import { useState } from 'react'

interface Props {
  step: number
  nextStep: (to: number) => void
}

export function FloatingStep({ step, nextStep }: Props) {
  const [current, setCurrent] = useState(0)

  const handleClick = (index: number) => {
    setCurrent(index)
    nextStep(index)
  }

  return (
    <div className='fixed bottom-5 left-1/2 translate--1/2 m-auto flex items-center gap-2'>
      {new Array(step).fill(0).map((_, i) => (
        <div
          className={`w-8 h-2 shadow rounded-lg cursor-pointer ${current === i ? 'bg-gray-900' : 'bg-white'} transition-colors duration-250 ease-in-out`}
          onClick={() => handleClick(i)}
        ></div>)
      )}
    </div>
  )
}
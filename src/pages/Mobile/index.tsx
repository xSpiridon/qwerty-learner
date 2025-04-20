import Flow from './flow'
import logo from '@/assets/logo.svg'
import directoryImg from '@/assets/mobile/carousel/directory.png'
import hotImg from '@/assets/mobile/carousel/hot.png'
import indexImg from '@/assets/mobile/carousel/index.png'
import codeImg from '@/assets/mobile/detail/code.png'
import dictationImg from '@/assets/mobile/detail/dictation.png'
import phoneticImg from '@/assets/mobile/detail/phonetic.png'
import speedImg from '@/assets/mobile/detail/speed.png'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

const detail = [
  {
    title: 'Phonetic symbol display and pronunciation function',
    description: 'Helps users memorize the pronunciation and phonetic symbols of words at the same time',
    img: phoneticImg,
  },
  {
    title: 'mimeograph mode',
    description: 'Optional mimeographs at the end of each chapter to reinforce the words learned',
    img: dictationImg,
  },
  {
    title: 'Real-time feedback',
    description: 'Displays input speed and correctness to quantify skill improvement',
    img: speedImg,
  },
  {
    title: 'Customized for programmers',
    description: 'Built-in programming-related thesaurus to improve work efficiency',
    img: codeImg,
  },
]

const MobilePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3 // 轮播图的总数量
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const slideWidth = container.offsetWidth

      if (currentSlide === 0) {
        container.style.transition = 'none'
        container.style.transform = `translateX(0)`
        setTimeout(() => {
          container.style.transition = 'transform 0.5s ease'
          container.style.transform = `translateX(-${slideWidth}px)`
        }, 50)
      } else {
        container.style.transform = `translateX(-${currentSlide * slideWidth}px)`
      }
    }
  }, [currentSlide])

  return (
    <div className="flex  w-screen flex-col">
      <section className="flex items-center justify-center py-2 shadow-md">
        <img src={logo} className="mr-3 h-16 w-16" alt="Qwerty Learner Logo" />
        <h1 className="text-2xl font-bold text-primary">Qwerty Learner</h1>
      </section>

      <section className="relative">
        <Flow />
        <div className="absolute top-10  flex w-full  flex-col items-center justify-center">
          <h1 className="animate__animated animate__zoomIn bg-gradient-to-b from-white to-[#dee0ff] bg-clip-text text-3xl font-bold text-transparent">
            Software for Keyboarders
          </h1>
          <h2
            className="animate__animated animate__zoomIn mt-5 text-sm font-bold text-white"
            style={{
              textShadow: '1px 1px 2px #9c9ea3',
            }}
          >
            Simplifies the process of learning English and improving typing skills, quickly building the right muscle memory
          </h2>
          <h2
            className="typewriter !mt-3 text-xs font-bold text-white"
            style={{
              textShadow: '1px 1px 2px #9c9ea3',
              overflow: 'hidden',
              borderRight: '0.15em solid #f0f0f0',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              animation: 'typing 3s steps(50), blink-caret 0.75s step-end 4, hideCaret 0s 3s forwards',
            }}
          >
            Combination of word memorization and keyboard input, phonetic pronunciation and dictation modes, and a variety of thesaurus choices.
          </h2>
        </div>
      </section>

      <section className="mt-4 px-10">
        <div
          style={{
            boxShadow: '0px 0px 12px rgba(0,0,0,0.12), 0px 8px 15px -3px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={containerRef}
            style={{
              display: 'flex',
              transition: 'transform 0.5s ease',
            }}
          >
            <img src={hotImg} alt="" style={{ width: '100%', flexShrink: 0 }} />
            <img src={directoryImg} alt="" style={{ width: '100%', flexShrink: 0 }} />
            <img src={indexImg} alt="" style={{ width: '100%', flexShrink: 0 }} />
            <img src={hotImg} alt="" style={{ width: '100%', flexShrink: 0 }} />
          </div>
        </div>
      </section>

      <section className="mt-10 px-5">
        <h1 className="text-center text-3xl font-bold text-primary">Helps you master words quickly</h1>

        <div className="mt-10">
          {detail.map((item, index) => {
            return (
              <div
                key={index}
                className={`my-4 rounded-2xl px-6 py-5 ${activeIndex === index ? 'bg-[#e7e7e7]' : 'hover:bg-[#e7e7e7]'}`}
                onClick={() => setActiveIndex(index)}
              >
                <h1>{item.title}</h1>
                <h2 className="text-gray-500">{item.description}</h2>
              </div>
            )
          })}
        </div>

        <div className="mt-20 flex h-[10rem] justify-center bg-white">
          <img className="w-full object-contain" src={detail[activeIndex].img} alt="" />
        </div>
      </section>

      <section
        className="mt-10 flex h-[20rem] w-full  flex-col items-center"
        style={{
          background: 'linear-gradient(-45deg, #6366f1, #6366f1, #6366f1, #b600ff)',
          backgroundSize: '600% 600%',
          animation: 'gradientBG 4s ease-in-out infinite',
        }}
      >
        <h1 className="mt-10 text-3xl font-bold text-white">Easy to get started, simple to use</h1>
        <h2 className="mt-10    px-10 text-white">Word and Muscle Memory Workout Software for Keyboarders</h2>
        <div className="mt-10 rounded-2xl bg-white px-6 py-3 font-bold text-primary">Please use a desktop browser to visit this site and experience it instantly!</div>
      </section>
    </div>
  )
}

export default MobilePage

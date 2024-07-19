'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
// import ImageCreation from './components/ImageCreation'

export default function Home() {
  const styles = {
    imageCreationCard: {
      backgroundColor: '#E4D9FF',
    },
    backstoryCreationCard: {
      backgroundColor: '#DDF5DA',
    },
  }

  const VIEWS = {
    INTRO: 'intro',
    HOME: 'home',
    IMAGE_CREATION: 'image-creation',
    BACKSTORY_CREATION: 'backstory-creation',
  }

  const cards = [
    {
      title: 'Create image',
      description:
        'All the character images are generated based on the users inputs through a selection process.',
      image: '',
      style: styles.imageCreationCard,
    },
    {
      title: 'Create backstory',
      description:
        'Once the user prompts and the image are generated they will be added to the story generation.',
      image: '',
      style: styles.backstoryCreationCard,
    },
  ]

  const [view, setView] = useState(VIEWS.INTRO) // set to intro
  const [showIntroScreen, setShowIntroScreen] = useState(true)
  // const [isImageCompleted, setIsImageCompleted] = useState(false)

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowIntroScreen(false)
    }, 1000)
    timer = setTimeout(() => {
      setView(VIEWS.HOME)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-grow flex-col ml-20">
        {view === VIEWS.INTRO ? (
          <div className="flex flex-grow justify-center">
            <div
              className={`flex transition-opacity duration-500 ease-in-out ${
                showIntroScreen ? 'opacity-100' : 'opacity-0'
              }`}>
              <div className="flex flex-grow flex-col justify-center items-center">
                <Image
                  src="/images/logo215x171.png"
                  alt="logo"
                  title="logo"
                  width={54}
                  height={43}
                  className="h-auto"
                />
                <span className="text-3xl md:text-6xl mt-4 font-bold">
                  character designer
                </span>
              </div>
            </div>
          </div>
        ) : (
          view === VIEWS.HOME && (
            <div className="flex flex-col flex-grow">
              <div className="flex flex-col justify-center items-center  h-2/6">
                <Image
                  src="/images/logo215x171.png"
                  alt="logo"
                  width={101}
                  height={79}
                  className="h-auto"
                />
                <div className="font-sans text-xl md:text-4xl font-bold mt-5">
                  How would you like to start?
                </div>
              </div>
              <div className="flex h-3/6 justify-center">
                <div className="grid grid-cols-2 gap-4 w-2/3">
                  {cards.map((card, index) => (
                    <div
                      key={index}
                      className="flex flex-col  shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
                      style={card.style}>
                      <div className="p-4 md:p-5">
                        <h3 className="text-lg dark:text-white font-sans">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray dark:text-neutral-400 font-serif">
                          {card.description}
                        </p>
                      </div>
                      <img
                        className="w-full h-auto rounded-b-xl"
                        src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
                        alt="Image Description"
                      />
                    </div>
                  ))}
                </div>
                <div className="h-1/6"></div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex min-w-20 justify-center py-3">
        <div className="grid">
          <Image
            src="/images/theme-button.png"
            alt="theme"
            title="theme"
            width={60}
            height={60}
            className="h-auto"
          />
        </div>
      </div>
    </div>
  )
}

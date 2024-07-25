'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { BackstoryCreation, ImageCreation } from './components'

export default function Home() {
  useEffect(() => {
    document.body.style.backgroundColor = '#fedadb'
  })

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

  const [view, setView] = useState<string>(VIEWS.INTRO) // set to intro
  const [showIntroScreen, setShowIntroScreen] = useState<boolean>(true)
  const [isImageCompleted, setIsImageCompleted] = useState<boolean>(false)
  const [characterImage, setCharacterImage] = useState<string>('')
  const [characterPhysicalDescription, setCharacterPhysicalDescription] =
    useState<string>('')

  const cards = [
    {
      title: 'Create image',
      description:
        'All the character images are generated based on the users inputs through a selection process.',
      imageSrc: '/images/character-creation.png',
      style: styles.imageCreationCard,
      isEnabled: true,
    },
    {
      title: 'Create backstory',
      description:
        'Once the user prompts and the image are generated they will be added to the story generation.',
      imageSrc: '/images/backstory-creation.png',
      style: styles.backstoryCreationCard,
      isEnabled: isImageCompleted,
    },
  ]

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowIntroScreen(false)
    }, 1000)

    timer = setTimeout(() => {
      setView(VIEWS.HOME)
    }, 1500)
    return () => clearTimeout(timer)
  }, [VIEWS.HOME])

  const handleStartBackstory = (image: string, physicalDescription: string) => {
    setCharacterImage(image)
    setCharacterPhysicalDescription(physicalDescription)
    setIsImageCompleted(true)
    setView(VIEWS.BACKSTORY_CREATION)
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-grow flex-col md:ml-20 ml-10">
        {view === VIEWS.INTRO ? (
          <div className="flex flex-grow justify-center">
            <div
              className={`flex transition-opacity duration-500 ease-in-out ${
                showIntroScreen ? 'opacity-100' : 'opacity-0'
              }`}>
              <div className="flex flex-grow flex-col justify-center items-center">
                <Image
                  src="/images/logo215x171.png"
                  alt="logo intro"
                  title="logo intro"
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
        ) : view === VIEWS.HOME ? (
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col justify-center items-center md:h-2/6 h-1/6">
              <Image
                src="/images/logo215x171.png"
                alt="logo"
                width={101}
                height={79}
                className="h-auto"
              />
              <div className="font-sans text-xl md:text-4xl font-bold md:mt-5 mt-2">
                How would you like to start?
              </div>
            </div>
            <div className="flex md:h-3/6 h-4/6 justify-center">
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-20 gap-4 w-2/3">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="flex flex-col shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
                    style={card.style}>
                    <div className="p-4 md:p-5">
                      <h3 className="text-lg md:font-normal dark:text-white font-sans">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray dark:text-neutral-400 font-serif">
                        {card.description}
                      </p>
                    </div>
                    <Image
                      src={card.imageSrc}
                      alt="image"
                      width={1289}
                      height={1148}
                      priority
                      className="h-auto md:px-20 px-10"
                    />
                    <div className="p-4 md:p-5 flex justify-end">
                      <a
                        className={`no-underline ${
                          card.isEnabled
                            ? 'cursor-pointer text-primary'
                            : 'text-gray-light'
                        }`}
                        onClick={() => {
                          if (!card.isEnabled) {
                            return
                          }

                          setView(VIEWS.IMAGE_CREATION)
                        }}>
                        + Create
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-grow justify-center items-end mb-5 font-serif">
              <p>
                *Character Designer is at an early stage and does not have all
                the functionalities available.
              </p>
            </div>
          </div>
        ) : view === VIEWS.IMAGE_CREATION ? (
          <ImageCreation
            onReturnHome={() => {
              document.body.style.backgroundColor = '#fedadb'
              setView(VIEWS.HOME)
            }}
            onStartBackstory={handleStartBackstory}></ImageCreation>
        ) : (
          view === VIEWS.BACKSTORY_CREATION && (
            <BackstoryCreation
              characterImage={characterImage}
              characterPhysicalDescription={characterPhysicalDescription}
              onGoHome={() => setView(VIEWS.HOME)}></BackstoryCreation>
          )
        )}
      </div>
      <div className="flex md:min-w-20 min-w-10 justify-center py-3">
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

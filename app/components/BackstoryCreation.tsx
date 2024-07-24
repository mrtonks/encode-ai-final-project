import { ChangeEvent, useEffect, useState } from 'react'
import {
  BackstoryCompletedScreen,
  BackstoryDetailsScreen,
  BackstoryNameScreen,
} from './BackstoryCreationScreens'

interface Step {
  progress: number
  previous: string
  next: string
}

interface Selections {
  theme: string
  story_length: string
  description: string
}

type SelectionKey = keyof Selections

interface Props {
  characterImage: string
  characterPhysicalDescription: string
}

export default function BackstoryCreation({
  characterImage,
  characterPhysicalDescription,
}: Props) {
  useEffect(() => {
    console.log(characterImage)
    console.log(characterPhysicalDescription)
  }, [])

  const steps: Record<string, Step> = {
    name: {
      progress: 33,
      previous: '',
      next: 'details',
    },
    details: {
      progress: 44,
      previous: 'name',
      next: 'completed',
    },
    completed: {
      progress: 100,
      previous: 'details',
      next: '',
    },
  }

  const descriptionMaxCharacters: number = 500

  const [view, setView] = useState<Step>(steps.name)
  const [progress, setProgress] = useState<number>(steps.name.progress)
  const [characterName, setCharacterName] = useState<string>('')
  const [selections, setSelections] = useState<Selections>({
    theme: 'Adventure',
    story_length: 'Short size, 100-200 words',
    description: '',
  })
  const [maxCharacters, setMaxCharacters] = useState<number>(
    descriptionMaxCharacters
  )
  const [isLoadingBackstory, setIsLoadingBackstory] = useState<boolean>(false)
  const [generatedStory, setGeneratedStory] = useState<string>('')

  useEffect(() => {
    document.body.style.backgroundColor = '#DDF5DA'
  })

  useEffect(() => {
    console.log(characterName) // remove
    setProgress(view.progress)
  }, [view])

  // remove
  useEffect(() => {
    console.log(selections)
  }, [selections])

  const handleUpdateName = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value
    setCharacterName(value.trim())
  }

  const handleUpdateSelection = (key: SelectionKey, value: string) => {
    if (key === 'description') {
      if (value.length <= descriptionMaxCharacters) {
        setMaxCharacters(descriptionMaxCharacters - value.length)
      } else {
        return
      }
    }

    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: value,
    }))
  }

  const handleBackstoryGeneration = () => {
    setIsLoadingBackstory(true)

    const prompts: string = `Write a story with the theme of ${selections.theme}. The story should be ${selections.story_length}. The main character's name of the story is ${characterName}. The physical description of the main character is ${characterPhysicalDescription}. This short description should be used to create the story: ${selections.description}`

    setTimeout(() => {
      setIsLoadingBackstory(false)
      setGeneratedStory(prompts)
      alert(prompts)
      setView(steps.completed)
    }, 1000)
  }

  const handleBackstoryRegeneration = (prompts: string) => {
    setIsLoadingBackstory(true)

    setTimeout(() => {
      setIsLoadingBackstory(false)
      setGeneratedStory(prompts)
      alert(prompts)
    }, 1000)
  }

  const handleDownload = () => {
    const blob = new Blob([generatedStory], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'character-designer-story.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col flex-grow my-5">
      {/* Main */}
      <div className="flex flex-col flex-grow">
        {!view.previous ? (
          <BackstoryNameScreen
            progress={progress}
            characterImage={characterImage}
            name={characterName}
            onUpdateName={handleUpdateName}></BackstoryNameScreen>
        ) : view.previous === 'name' ? (
          <BackstoryDetailsScreen
            progress={progress}
            selections={selections}
            maxCharacters={maxCharacters}
            onUpdateSelection={handleUpdateSelection}></BackstoryDetailsScreen>
        ) : (
          view.previous === 'details' && (
            <BackstoryCompletedScreen
              progress={progress}
              generatedStory={generatedStory}
              onDownload={handleDownload}
              isLoading={isLoadingBackstory}
              onRegeneration={
                handleBackstoryRegeneration
              }></BackstoryCompletedScreen>
          )
        )}
      </div>
      {/* Action buttons */}
      <div className="flex flex-row h-1/6 md:mt-0 mt-3 justify-between items-center">
        <div>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-light-2 text-primary hover:border-purple hover:text-purple disabled:opacity-50 disabled:pointer-events-none"
            disabled={!view.previous}
            onClick={() => {
              if (!!view.previous) {
                setView(steps[view.previous])
              }
            }}>
            <span className="material-symbols-outlined">chevron_left</span>
            Previous
          </button>
        </div>
        <div>
          {isLoadingBackstory ? (
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-light-2 text-primary hover:border-purple hover:text-purple disabled:opacity-50 disabled:pointer-events-none"
              disabled>
              <span
                className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-primary rounded-full"
                role="status"
                aria-label="loading">
                <span className="sr-only">Loading...</span>
              </span>
              Loading
            </button>
          ) : (
            !!view.next && (
              <button
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-light-2 text-primary hover:border-purple hover:text-purple disabled:opacity-50 disabled:pointer-events-none"
                disabled={
                  view.next === 'details'
                    ? !characterName
                    : view.next === 'completed'
                    ? false
                    : true
                }
                onClick={() => {
                  const next = view.next

                  if (next === 'completed') {
                    handleBackstoryGeneration()
                  } else {
                    setView(steps[next])
                  }
                }}>
                Next
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

import { ChangeEvent, useEffect, useState } from 'react'
import {
  ImageSelectionsScreen,
  ImageDescriptionScreen,
  ImageReviewScreen,
  ImageCompletedScreen,
} from './ImageCreationScreens'

interface Selections {
  imageStyle: string[] // or use another appropriate type instead of string
  hairColor: string
  hairStyle: string
  height: string
  build: string
  skinTone: string
  facialFeatures: string
  description: string
}

type SelectionKey = keyof Selections

interface Step {
  progress: number
  previous: string
  next: string
}

interface Props {
  onReturnHome: () => void
  onStartBackstory: (image: string, physicalDescription: string) => void
}

export default function ImageCreation({
  onReturnHome,
  onStartBackstory,
}: Props) {
  const steps: Record<string, Step> = {
    selections: {
      progress: 25,
      previous: '',
      next: 'description',
    },
    description: {
      progress: 50,
      previous: 'selections',
      next: 'review',
    },
    review: {
      progress: 75,
      previous: 'description',
      next: 'completed',
    },
    completed: {
      progress: 100,
      previous: 'review',
      next: '',
    },
  }

  const [view, setView] = useState<Step>(steps.selections)
  const [progress, setProgress] = useState<number>(steps.selections.progress)
  const [selections, setSelections] = useState<Selections>({
    imageStyle: [],
    hairColor: '',
    hairStyle: '',
    height: '',
    build: '',
    skinTone: '',
    facialFeatures: '',
    description: '',
  })
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)
  const [base64Image, setBase64Image] = useState<string>(
    '/images/character-image-sample.png'
  ) // remove default
  const [physicalDescription, setPhysicalDescription] = useState<string>('')
  const [isDownloading, setIsDownloading] = useState<boolean>(false)

  useEffect(() => {
    document.body.style.backgroundColor = '#E4D9FF'
  }, [])

  const countWords = (selections: Selections): number => {
    let totalWords = 0

    Object.values(selections).forEach((value) => {
      if (typeof value === 'string') {
        totalWords += value.trim().split(/\s+/).filter(Boolean).length
      } else if (Array.isArray(value)) {
        totalWords += value.reduce(
          (acc, str) => acc + str.trim().split(/\s+/).filter(Boolean).length,
          0
        )
      }
    })

    return totalWords
  }

  const maxWords: number = 75 - countWords(selections)

  const handleUpdateSelection = (key: SelectionKey, value: string) => {
    let newValue: any

    if (key === 'imageStyle') {
      const currentValues = [...selections.imageStyle]
      if (currentValues.includes(value)) {
        newValue = currentValues.filter((v) => v !== value)
      } else {
        newValue = [...currentValues, value]
      }
    } else {
      newValue = value
    }

    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: newValue,
    }))
  }

  const handleRemoveSelection = (key: SelectionKey) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: [],
    }))
  }

  const handleUpdateDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const words = value.match(/\b\w+\b/g) || [] // Match only words

    if (words.length <= maxWords) {
      setSelections((prevSelections) => ({
        ...prevSelections,
        description: value,
      }))
    } else {
      // Prevent additional input by ignoring the new value
      event.preventDefault()
    }
  }

  const handleRemovePrompt = (key: SelectionKey, value: string) => {
    let newValue: any

    if (key === 'imageStyle') {
      const currentValues = [...selections.imageStyle]
      newValue = currentValues.filter((v) => v !== value)
    } else {
      newValue = ''
    }

    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: newValue,
    }))
  }

  const handleGenerateImage = async (): Promise<void> => {
    setIsLoadingImage(true)

    let prompts: string = ''
    let promptsTextGeneration: string = ''
    Object.values(selections).forEach((value) => {
      if (typeof value === 'string' && !!value) {
        prompts += ' ' + value.trim().split(/\s+/).filter(Boolean)
        promptsTextGeneration += value.trim() + ', '
      } else if (Array.isArray(value)) {
        prompts += value.reduce(
          (acc, str) => acc + ' ' + str.trim().split(/\s+/).filter(Boolean),
          ''
        )
      }
    })

    // Prompts to be used for generating the image
    const cleanedPrompts: string = prompts.replace(/,/g, ' ')

    const response = await fetch('api/create-character', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: cleanedPrompts,
      }),
    })
    const imageData = await response.text()
    setBase64Image(imageData)

    setPhysicalDescription(
      promptsTextGeneration
        .trim()
        .substring(0, promptsTextGeneration.length - 2)
    )

    setIsLoadingImage(false)
  }

  const handleRegenerateImage = async (
    prompts: string = '',
    negativePrompts: string = ''
  ) => {
    setIsLoadingImage(true)

    const response = await fetch('api/regenerate-character', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompts,
        image: base64Image,
      }),
    })
    const newImageData = await response.text()
    setBase64Image(newImageData)
    setIsLoadingImage(false)
  }

  const handleDownload = () => {
    setIsDownloading(true)
    const link = document.createElement('a')
    link.href = base64Image
    link.download = 'character-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsDownloading(false)
  }

  useEffect(() => {
    setProgress(view.progress)
  }, [view])

  return (
    <div className="flex flex-col flex-grow md:my-0 my-5">
      {/* Main area */}
      <div className="flex flex-grow md:flex-row flex-col m-auto">
        {!view.previous ? (
          <ImageSelectionsScreen
            progress={progress}
            selections={selections}
            onUpdateSelection={handleUpdateSelection}
            onRemoveSelection={handleRemoveSelection}></ImageSelectionsScreen>
        ) : view.previous === 'selections' ? (
          <ImageDescriptionScreen
            progress={progress}
            maxWords={maxWords}
            description={selections.description}
            onUpdateDescription={
              handleUpdateDescription
            }></ImageDescriptionScreen>
        ) : view.previous === 'description' ? (
          <ImageReviewScreen
            progress={progress}
            selections={selections}
            onRemovePrompt={handleRemovePrompt}></ImageReviewScreen>
        ) : (
          view.previous === 'review' && (
            <ImageCompletedScreen
              progress={progress}
              base64Image={base64Image}
              isDownloading={isDownloading}
              isLoading={isLoadingImage}
              onDownload={handleDownload}
              onRegenerateImage={handleRegenerateImage}
              onStartBackstory={() =>
                onStartBackstory(base64Image, physicalDescription)
              }></ImageCompletedScreen>
          )
        )}
      </div>
      {/* Action buttons */}
      <div className="flex flex-row h-1/6 justify-between items-center">
        <div>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-light-2 text-primary hover:border-purple hover:text-purple disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => {
              setIsLoadingImage(false)
              if (!view.previous) {
                onReturnHome()
              } else {
                setView(steps[view.previous])
              }
            }}>
            <span className="material-symbols-outlined">chevron_left</span>
            Previous
          </button>
        </div>
        <div>
          {!isLoadingImage ? (
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-light-2 text-primary hover:border-purple hover:text-purple disabled:opacity-50 disabled:pointer-events-none"
              disabled={!selections.imageStyle.length}
              onClick={() => {
                const next = view.next

                if (!next) {
                  onStartBackstory(base64Image, physicalDescription)
                  return
                } else if (next === 'completed') {
                  handleGenerateImage()
                  setView(steps.completed)
                  return
                }

                setView(steps[next])
              }}>
              Next
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  )
}

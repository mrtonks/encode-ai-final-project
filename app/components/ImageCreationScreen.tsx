import { ChangeEvent, useEffect, useState } from 'react'
import { ImageSelectionsScreen, ImageDescriptionScreen } from '.'

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

interface Step {
  progress: number
  previous: string
  next: string
}

interface Props {
  onPreviousClick: () => void
}

export default function ImageCreation({ onPreviousClick }: Props) {
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
      next: 'finished',
    },
    finished: {
      progress: 100,
      previous: 'review',
      next: '',
    },
  }

  const maxWords: number = 75

  const [view, setView] = useState<Step>(steps.selections)
  const [wordCount, setWordCount] = useState<number>(0)
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

  useEffect(() => {
    document.body.style.backgroundColor = '#E4D9FF'
  }, [])

  const updateSelection = (key: keyof Selections, value: string) => {
    let newValues: any

    if (key === 'imageStyle') {
      const currentValues = [...selections[key]]
      if (currentValues.includes(value)) {
        newValues = currentValues.filter((v) => v !== value)
      } else {
        newValues = [...currentValues, value]
      }
    } else {
      newValues = value
    }

    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: newValues,
    }))
  }

  const removeSelection = (key: keyof Selections) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: [],
    }))
  }

  const updateDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const words = value.match(/\b\w+\b/g) || [] // Match only words

    if (words.length <= maxWords) {
      setSelections((prevSelections) => ({
        ...prevSelections,
        description: value,
      }))
      setWordCount(words.length)
    } else {
      // Prevent additional input by ignoring the new value
      event.preventDefault()
    }
  }

  useEffect(() => {
    console.log(selections)
    console.log(view)

    setProgress(view.progress)
  }, [view])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main area */}
      <div className="flex md:h-5/6 md:flex-row flex-col">
        {!view.previous ? (
          <ImageSelectionsScreen
            step={progress}
            selections={selections}
            onUpdateSelection={updateSelection}
            onRemoveSelection={removeSelection}></ImageSelectionsScreen>
        ) : view.previous === 'selections' ? (
          <ImageDescriptionScreen
            step={progress}
            maxWords={maxWords}
            wordCount={wordCount}
            description={selections.description}
            onUpdateDescription={updateDescription}></ImageDescriptionScreen>
        ) : (
          <div></div>
        )}
      </div>
      {/* Action buttons */}
      <div className="flex h-1/6 justify-between">
        <div>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-light-2 text-primary hover:border-purple hover:text-purple disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => {
              if (!view.previous) {
                onPreviousClick()
              } else {
                setView(steps[view.previous])
              }
            }}>
            <span className="material-symbols-outlined">chevron_left</span>
            Previous
          </button>
        </div>
        <div>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-light-2 text-primary hover:border-purple hover:text-purple disabled:opacity-50 disabled:pointer-events-none"
            disabled={!selections.imageStyle.length}
            onClick={() => {
              const next = view.next
              setView(steps[next])
            }}>
            Next
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}
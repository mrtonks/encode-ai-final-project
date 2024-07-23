import { ChangeEvent, useEffect, useState } from 'react'
import {
  BackstoryDetailsScreen,
  BackstoryNameScreen,
} from './BackstoryCreationScreens'

interface Step {
  progress: number
  previous: string
  next: string
}

interface Props {
  characterImage: string
}

export default function BackstoryCreation({ characterImage }: Props) {
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

  const [view, setView] = useState<Step>(steps.name)
  const [progress, setProgress] = useState<number>(steps.name.progress)
  const [characterName, setCharacterName] = useState<string>('')

  useEffect(() => {
    document.body.style.backgroundColor = '#DDF5DA'
  })

  useEffect(() => {
    console.log(characterName)
    setProgress(view.progress)
  }, [view])

  const handleUpdateName = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value
    setCharacterName(value.trim())
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
        ) : (
          view.previous === 'name' && (
            <BackstoryDetailsScreen
              progress={progress}></BackstoryDetailsScreen>
          )
        )}
      </div>
      {/* Action buttons */}
      <div className="flex flex-row h-1/6 justify-between items-center">
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

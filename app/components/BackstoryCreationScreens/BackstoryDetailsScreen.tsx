import Image from 'next/image'
import { useState } from 'react'
interface Selections {
  theme: string
  story_length: string
  description: string
}

type SelectionKey = keyof Selections

interface ArrayOption {
  label: string
  description: string
  legend: string
}

interface Tab {
  id: number
  name: SelectionKey | undefined
  label: string
  icon: string
  type: string
  multiple_choice_options: string[]
  array_options: ArrayOption[]
}

interface Props {
  progress: number
  selections: Selections
  maxCharacters: number
  onUpdateSelection: (key: SelectionKey, value: string) => void
}

export default function BackstoryDetailsScreen({
  progress,
  selections,
  maxCharacters,
  onUpdateSelection,
}: Props) {
  const TAB_TYPES = {
    MULTIPLE_CHOICE: 'multiple-choice',
    MULTIPLE_CHOICE_DETAILS: 'multiple-choice-details',
    TEXT: 'text',
  }

  const tabs: Record<string, Tab> = {
    theme: {
      id: 0,
      name: 'theme',
      label: 'Theme',
      icon: 'format_paint',
      type: TAB_TYPES.MULTIPLE_CHOICE,
      array_options: [],
      multiple_choice_options: [
        'Adventure',
        'Romance',
        'Tragedy',
        'Comedy',
        'Mystery',
        'Fantasy',
        'Horror',
        'Heroic',
        'Redemption',
        'Revenge',
        'Epic',
      ],
    },
    story_length: {
      id: 1,
      name: 'story_length',
      label: 'Story length',
      icon: 'design_services',
      type: TAB_TYPES.MULTIPLE_CHOICE_DETAILS,
      multiple_choice_options: [],
      array_options: [
        {
          label: 'Short',
          description: 'Brief and concise, ideal for quick backstories',
          legend: '100-200 words',
        },
        {
          label: 'Medium',
          description:
            'Detailed enough to provide a good amount of background information',
          legend: '300-500 words',
        },
        {
          label: 'Long',
          description:
            'In-depth and comprehensive perfect for detailed backstories',
          legend: '600-1000 words',
        },
      ],
    },
    description: {
      id: 2,
      name: 'description',
      label: 'Description',
      icon: 'text_fields',
      type: TAB_TYPES.TEXT,
      multiple_choice_options: [],
      array_options: [],
    },
  }

  const [activeTab, setActiveTab] = useState<number>(0)

  return (
    <div className="flex flex-grow md:flex-row flex-col md:gap-20 justify-center">
      {/* Title */}
      <div className="flex flex-col md:w-1/4 items-center my-auto">
        <Image
          src="/images/logo215x171.png"
          alt="logo"
          title="logo"
          width={101}
          height={79}
          className="h-auto"
        />
        <div className="w-full m-10">
          <div
            className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}>
            <div
              className="flex flex-col justify-center rounded-full overflow-hidden bg-primary text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
              style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <p className="md:text-4xl text-lg font-sans font-bold text-center">
          Which are the theme, length and description of your story?
        </p>
        <p className="md:mt-20 mt-5 font-serif md:text-sm text-xs text-secondary">
          *Character Designer is at an early stage and does not have all the
          functionalities available.
        </p>
      </div>
      <div className="flex flex-col md:w-1/4 md:mt-16 mt-5">
        <nav className="flex space-x-4">
          {Object.values(tabs).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
              }}
              className={`flex flex-col items-center px-4 py-2 font-medium text-sm rounded-t-lg transition duration-300 ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700 '
              }`}>
              <span className="material-symbols-outlined">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="pt-4">
          {Object.entries(tabs).map(([key, tab]) => (
            <div
              key={tab.id}
              className={`transition duration-300 ${
                activeTab === tab.id ? 'block' : 'hidden'
              }`}>
              {tab.type === TAB_TYPES.MULTIPLE_CHOICE ? (
                <div className="flex flex-col bg-purple-light border-purple-light shadow-sm rounded-xl p-4 md:p-5">
                  {tab.multiple_choice_options.map((option, index) => (
                    <div key={index} className="flex py-3">
                      <label
                        htmlFor={`radio-${option}`}
                        className="flex flex-grow cursor-pointer">
                        {option}
                      </label>
                      <input
                        type="radio"
                        id={`radio-${option}`}
                        name={`radio-${key}`}
                        className="shrink-0 mt-0.5 bg-purple-light rounded-full text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                        checked={selections[key as SelectionKey] === option}
                        onChange={() =>
                          onUpdateSelection(key as SelectionKey, option)
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : tab.type === TAB_TYPES.MULTIPLE_CHOICE_DETAILS ? (
                <div className="flex flex-col bg-purple-light border-purple-light shadow-sm rounded-xl p-4 md:p-5">
                  {tab.array_options.map((option, index) => (
                    <div key={index} className="flex py-3 gap-3">
                      <div
                        className="flex flex-col flex-grow cursor-pointer"
                        onClick={() => {
                          onUpdateSelection(
                            key as SelectionKey,
                            `${option.label} size, ${option.legend}`
                          )
                        }}>
                        <span className="flex flex-grow justify-between items-center">
                          {option.label}{' '}
                          <span className="text-xs">({option.legend})</span>
                        </span>
                        <p className="text-wrap text-sm text-gray-600">
                          {option.description}.
                        </p>
                      </div>
                      <input
                        type="radio"
                        id={`radio-${option}`}
                        name={`radio-${key}`}
                        className="shrink-0 mt-0.5 bg-purple-light rounded-full text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                        checked={
                          selections[key as SelectionKey] ===
                          `${option.label} size, ${option.legend}`
                        }
                        onChange={() =>
                          onUpdateSelection(
                            key as SelectionKey,
                            `${option.label} size, ${option.legend}`
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                tab.type === TAB_TYPES.TEXT && (
                  <div className="flex flex-col">
                    <textarea
                      id="hs-textarea-with-corner-hint"
                      className="mb-2 py-3 px-4 block w-full bg-purple-light border-gray-300 rounded-lg text-sm focus:border-purple focus:ring-purple disabled:opacity-50 disabled:pointer-events-none shadow-md"
                      rows={12}
                      value={selections[key as SelectionKey]}
                      placeholder="Story description..."
                      onChange={(e) => {
                        const value = e.target.value
                        onUpdateSelection(key as SelectionKey, value)
                      }}></textarea>
                    <span className="flex w-32 rounded py-1 pl-2 bg-gray-800 mb-2 text-xs text-white">
                      {`${maxCharacters} characters left`}
                    </span>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

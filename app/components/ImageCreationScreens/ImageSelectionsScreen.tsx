import { useState } from 'react'
import Image from 'next/image'

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

interface ArrayOption {
  name: SelectionKey
  label: string
  options: string[]
}

interface Tab {
  id: number
  name: SelectionKey | undefined
  label: string
  icon: string
  type: string
  isEnabled: boolean
  maxSelections: number
  array_options: Record<string, ArrayOption>
  multiple_choice_options: string[]
}

const TAB_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  ARRAY_MULTIPLE_CHOICE: 'array-multi-choice',
}

const tabs: Record<string, Tab> = {
  imageStyle: {
    id: 0,
    name: 'imageStyle',
    label: 'Image style',
    icon: 'image',
    type: TAB_TYPES.MULTIPLE_CHOICE,
    isEnabled: true,
    maxSelections: 2,
    array_options: {},
    multiple_choice_options: [
      'Claymation',
      'Hand-drawn 2D art',
      'Anthropomorphic animals',
      'Pixel art',
      'Cel-shaded',
      'Watercolor',
      'Cartoon',
      'Sci-fi',
      'Realistic',
      'Chibi',
      'Anime',
    ],
  },
  characterTraits: {
    id: 1,
    name: undefined,
    label: 'Character traits',
    icon: 'ar_stickers',
    type: TAB_TYPES.ARRAY_MULTIPLE_CHOICE,
    isEnabled: true,
    maxSelections: 1,
    multiple_choice_options: [],
    array_options: {
      hairColor: {
        name: 'hairColor',
        label: 'Hair color',
        options: [
          'Brown',
          'Black',
          'Red',
          'White',
          'Grey',
          'Blonde',
          'Platinum',
          'Violet',
          'Blue',
          'Green',
        ],
      },
      hairStyle: {
        name: 'hairStyle',
        label: 'Hair style',
        options: [
          'Short and spiky',
          'Long flowing',
          'Ponytail',
          'Bun',
          'Braids',
          'Mohawk',
          'Dreadlocks',
          'Bald',
          'Fringe',
        ],
      },
      height: {
        name: 'height',
        label: 'Height',
        options: ['Very tall', 'Tall', 'Average', 'Short', 'Very short'],
      },
      build: {
        name: 'build',
        label: 'Build',
        options: [
          'Muscular',
          'Slender',
          'Stocky',
          'Athletic',
          'Lean',
          'Curvy',
          'Petite',
          'Heavyset',
        ],
      },
      skinTone: {
        name: 'skinTone',
        label: 'Skin tone',
        options: [
          'Fair',
          'Light',
          'Medium',
          'Olive',
          'Tan',
          'Dark',
          'Evony',
          'Purple',
          'Blue',
          'Green',
        ],
      },
      facialFeatures: {
        name: 'facialFeatures',
        label: 'Facial features',
        options: [
          'Prominent nose',
          'Sharp jawline',
          'High cheekbones',
          'Full lips',
          'Deep-set eyes',
          'Thin eyebows',
          'Spots',
        ],
      },
    },
  },
  modelSources: {
    id: 2,
    name: undefined,
    label: 'Model sources',
    icon: 'check_box',
    type: TAB_TYPES.MULTIPLE_CHOICE,
    isEnabled: false,
    maxSelections: 1,
    multiple_choice_options: [],
    array_options: {},
  },
}

interface Props {
  progress: number
  selections: Selections
  onUpdateSelection: (key: SelectionKey, value: string) => void
  onRemoveSelection: (key: SelectionKey) => void
}

export default function ImageSelectionScreen({
  progress,
  selections,
  onUpdateSelection,
  onRemoveSelection,
}: Props) {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [activeTrait, setActiveTrait] = useState<SelectionKey | undefined>()

  return (
    <div className="flex flex-col md:flex-row md:gap-20 justify-center">
      {/* Title */}
      <div className="flex md:w-2/6 flex-col justify-center">
        <div className="flex flex-col flex-grow items-center justify-center">
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
            Which image style and traits would you like to add?
          </p>
          <p className="md:mt-20 mt-5 font-serif md:text-sm text-xs text-secondary">
            *Character Designer is at an early stage and does not have all the
            functionalities available.
          </p>
        </div>
      </div>
      {/* Selections */}
      <div className="flex md:w-2/6 flex-col md:mt-16 mt-5 md:px-8">
        <div className="p-4">
          <nav className="flex space-x-4">
            {Object.values(tabs).map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (!tab.isEnabled) return
                  setActiveTab(tab.id)
                  setActiveTrait(undefined)
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
                {tab.type === TAB_TYPES.MULTIPLE_CHOICE && tab.isEnabled ? (
                  <div className="flex flex-col bg-tertiary border border-tertiary shadow-sm rounded-xl p-4 md:p-5">
                    {tab.multiple_choice_options.map((option, index) => (
                      <div key={index} className="flex py-3">
                        <label
                          htmlFor={`checkbox-${option}`}
                          className="flex flex-grow">
                          {option}
                        </label>
                        <input
                          type="checkbox"
                          className="shrink-0 border-2 rounded bg-tertiary text-primary focus:ring-purple disabled:opacity-50 disabled:pointer-events-none"
                          id={`checkbox-${option}`}
                          disabled={
                            !!tab.maxSelections &&
                            !selections[key as SelectionKey].includes(option) &&
                            selections[key as SelectionKey].length >=
                              tab.maxSelections
                          }
                          checked={selections[key as SelectionKey].includes(
                            option
                          )}
                          onChange={() => {
                            if (!tab.name) return
                            onUpdateSelection(key as SelectionKey, option)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  tab.type === TAB_TYPES.ARRAY_MULTIPLE_CHOICE &&
                  tab.isEnabled && (
                    <div className="flex flex-col bg-tertiary border border-tertiary shadow-sm rounded-xl p-4 md:p-5">
                      {!activeTrait ? (
                        Object.entries(tab.array_options).map(
                          ([key, option], index) => (
                            <div
                              key={index}
                              className="flex py-3 cursor-pointer">
                              <input
                                type="checkbox"
                                id={`toggle-${option.name}`}
                                className="relative w-[3.25rem] h-7 p-px bg-tertiary text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-primary checked:border-purple focus:checked:border-purple  before:inline-block before:size-6 before:bg-white before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
                                checked={
                                  !!selections[key as SelectionKey].length
                                }
                                onChange={() => {
                                  if (!selections[key as SelectionKey].length) {
                                    setActiveTrait(option.name)
                                  }
                                  onRemoveSelection(key as SelectionKey)
                                }}
                              />
                              <div
                                className="flex flex-grow ml-3 justify-between"
                                onClick={() => setActiveTrait(option.name)}>
                                <span>{option.label}</span>
                                <span className="material-symbols-outlined">
                                  arrow_right
                                </span>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <div>
                          <div className="flex cursor-pointer">
                            <span
                              className="material-symbols-outlined"
                              onClick={() => setActiveTrait(undefined)}>
                              arrow_left
                            </span>
                            <label
                              htmlFor={`radio-${tab.array_options[activeTrait].label}`}
                              className="flex-grow">
                              {tab.array_options[activeTrait].label}
                            </label>
                            <input
                              type="checkbox"
                              id={`toggle-${tab.array_options[activeTrait].label}`}
                              className="relative w-[3.25rem] h-7 p-px bg-tertiary text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-primary checked:border-purple focus:checked:border-purple  before:inline-block before:size-6 before:bg-white before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
                              checked={
                                !!selections[activeTrait as SelectionKey].length
                              }
                              onChange={() =>
                                onRemoveSelection(activeTrait as SelectionKey)
                              }
                            />
                          </div>
                          {tab.array_options[activeTrait].options.map(
                            (option, index) => (
                              <div key={index} className="flex py-3">
                                <label
                                  htmlFor={`radio-${option}`}
                                  className="flex-grow cursor-pointer">
                                  {option}
                                </label>
                                <input
                                  type="radio"
                                  id={`radio-${option}`}
                                  name={`radio-${activeTrait}`}
                                  className="shrink-0 mt-0.5 bg-tertiary rounded-full text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                  checked={
                                    selections[activeTrait as SelectionKey] ===
                                    option
                                  }
                                  onChange={() =>
                                    onUpdateSelection(
                                      activeTrait as SelectionKey,
                                      option
                                    )
                                  }
                                />
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

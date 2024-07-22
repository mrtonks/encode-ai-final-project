import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Selections {
  imageStyle: string[] // or use another appropriate type instead of string
  hairColor: string
  hairStyle: string
  height: string
  build: string
  skinTone: string
  facialFeatures: string
}

type SelectionKey = keyof Selections

interface ArrayOption {
  name: keyof Selections
  label: string
  options: string[]
}

interface Tab {
  id: number
  name: keyof Selections | undefined
  label: string
  icon: string
  type: string
  isEnabled: boolean
  maxSelections: number
  array_options: Record<string, ArrayOption>
  multiple_choice_options: string[]
}

interface Props {
  onPreviousClick: () => void
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
    icon: 'add_circle',
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

export default function ImageCreation({ onPreviousClick }: Props) {
  const steps = {
    first: {
      progress: 20,
    },
    second: {
      progress: 40,
    },
    third: {
      progress: 60,
    },
    fourth: {
      progress: 80,
    },
    fifth: {
      progress: 100,
    },
  }

  const [selections, setSelections] = useState<Selections>({
    imageStyle: [],
    hairColor: '',
    hairStyle: '',
    height: '',
    build: '',
    skinTone: '',
    facialFeatures: '',
  })
  const [step, setStep] = useState(steps.first)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [activeTrait, setActiveTrait] = useState<SelectionKey | undefined>()

  useEffect(() => {
    document.body.style.backgroundColor = '#E4D9FF'
  }, [])

  const updateSelection = (key: keyof Selections, value: string) => {
    let newValues

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

  useEffect(() => {
    console.log(selections)
  }, [selections])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex md:h-5/6 md:flex-row flex-col">
        {/* Screen title */}
        <div className="flex md:w-3/6 md:pl-20 md:pr-40 px-10 md:mt-0 mt-5 flex-col justify-center">
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
                aria-valuenow={step.progress}
                aria-valuemin={0}
                aria-valuemax={100}>
                <div
                  className="flex flex-col justify-center rounded-full overflow-hidden bg-primary text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
                  style={{ width: `${step.progress}%` }}></div>
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
        {/* Tabs */}
        <div className="flex md:w-2/6 flex-col mt-5 md:px-8">
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
                    <div className="flex flex-col bg-pink border border-pink shadow-sm rounded-xl p-4 md:p-5">
                      {tab.multiple_choice_options.map((option, index) => (
                        <div key={index} className="flex py-3">
                          <label
                            htmlFor={`checkbox-${option}`}
                            className="flex flex-grow">
                            {option}
                          </label>
                          <input
                            type="checkbox"
                            className="shrink-0 border-2 rounded bg-pink text-primary focus:ring-purple disabled:opacity-50 disabled:pointer-events-none"
                            id={`checkbox-${option}`}
                            disabled={
                              !!tab.maxSelections &&
                              !selections[key as keyof Selections].includes(
                                option
                              ) &&
                              selections[key as keyof Selections].length >=
                                tab.maxSelections
                            }
                            onChange={() => {
                              if (!tab.name) return
                              updateSelection(key as keyof Selections, option)
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    tab.type === TAB_TYPES.ARRAY_MULTIPLE_CHOICE &&
                    tab.isEnabled && (
                      <div className="flex flex-col bg-pink border border-pink shadow-sm rounded-xl p-4 md:p-5">
                        {!activeTrait ? (
                          Object.entries(tab.array_options).map(
                            ([key, option], index) => (
                              <div
                                key={index}
                                className="flex py-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  id={`toggle-${option}`}
                                  className="relative w-[3.25rem] h-7 p-px bg-pink text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-primary checked:border-purple focus:checked:border-purple  before:inline-block before:size-6 before:bg-white before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
                                  checked={
                                    !!selections[key as keyof Selections].length
                                  }
                                  onChange={() => {
                                    if (
                                      !selections[key as keyof Selections]
                                        .length
                                    ) {
                                      setActiveTrait(option.name)
                                    }
                                    removeSelection(key as keyof Selections)
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
                                className="relative w-[3.25rem] h-7 p-px bg-pink text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-primary checked:border-purple focus:checked:border-purple  before:inline-block before:size-6 before:bg-white before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
                                checked={
                                  !!selections[activeTrait as keyof Selections]
                                    .length
                                }
                                onChange={() =>
                                  removeSelection(
                                    activeTrait as keyof Selections
                                  )
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
                                    className="shrink-0 mt-0.5 bg-pink rounded-full text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                    checked={
                                      selections[
                                        activeTrait as keyof Selections
                                      ] === option
                                    }
                                    onChange={() =>
                                      updateSelection(
                                        activeTrait as keyof Selections,
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
      {/* Action buttons */}
      <div className="flex h-1/6 justify-between">
        <div>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-light-2 text-primary hover:border-purple hover:text-purple disabled:opacity-50 disabled:pointer-events-none"
            onClick={onPreviousClick}>
            <span className="material-symbols-outlined">chevron_left</span>
            Previous
          </button>
        </div>
        <div>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-light-2 text-primary hover:border-purple hover:text-purple disabled:opacity-50 disabled:pointer-events-none"
            disabled={!selections.imageStyle.length}>
            Next
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}

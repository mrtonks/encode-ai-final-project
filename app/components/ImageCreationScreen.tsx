import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Selections {
  imageStyle: string[] // or use another appropriate type instead of string
  hairColor: string[]
  hairStyle: string[]
  build: string[]
  skinTone: string[]
  facialFeatures: string[]
}

type SelectionKey = keyof Selections

interface Tab {
  id: number
  name: SelectionKey | undefined
  label: string
  icon: string
  type: string
  isEnabled: boolean
  maxSelections?: number
  array_options: {
    name?: SelectionKey
    label: string
    options: string[]
  }[]
  multiple_choice_options: string[]
}

interface Props {
  onPreviousClick: () => void
}

export default function ImageCreation({ onPreviousClick }: Props) {
  const TAB_TYPES = {
    MULTIPLE_CHOICE: 'multiple-choice',
    ARRAY_MULTIPLE_CHOICE: 'array-multi-choice',
  }

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
    hairColor: [],
    hairStyle: [],
    build: [],
    skinTone: [],
    facialFeatures: [],
  })
  const [step, setStep] = useState(steps.first)
  const [activeTab, setActiveTab] = useState(0)

  const tabs: Tab[] = [
    {
      id: 0,
      name: 'imageStyle',
      label: 'Image style',
      icon: 'add_circle',
      type: TAB_TYPES.MULTIPLE_CHOICE,
      isEnabled: true,
      maxSelections: 2,
      array_options: [],
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
    {
      id: 1,
      name: undefined,
      label: 'Character traits',
      icon: 'ar_stickers',
      type: TAB_TYPES.ARRAY_MULTIPLE_CHOICE,
      isEnabled: true,
      maxSelections: 1,
      multiple_choice_options: [],
      array_options: [
        {
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
        {
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
        {
          label: 'Heigh',
          options: ['Very tall', 'Tall', 'Average', 'Short', 'Very short'],
        },
        {
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
        {
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
        {
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
      ],
    },
    {
      id: 2,
      name: undefined,
      label: 'Model sources',
      icon: 'check_box',
      type: TAB_TYPES.MULTIPLE_CHOICE,
      isEnabled: false,
      maxSelections: 1,
      multiple_choice_options: [],
      array_options: [],
    },
  ]

  useEffect(() => {
    document.body.style.backgroundColor = '#E4D9FF'
  }, [])

  const updateSelection = (key: keyof Selections, value: string) => {
    const currentValues = [...selections[key]]
    let newValues = []
    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v) => v !== value)
    } else {
      newValues = [...currentValues, value]
    }
    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: newValues,
    }))
  }

  useEffect(() => {
    console.log(selections)
  }, [selections])

  return (
    <div className="flex md:flex-row flex-col min-h-screen">
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
        <div className="flex w-full md:mb-10">
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-light-2 text-primary hover:border-purple hover:text-purple disabled:opacity-50 disabled:pointer-events-none"
            onClick={onPreviousClick}>
            <span className="material-symbols-outlined">chevron_left</span>
            Previous
          </button>
        </div>
      </div>
      <div className="flex md:w-2/6 flex-col mt-5 md:pr-14">
        <div className="p-4">
          <nav className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (!tab.isEnabled) return
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
            {tabs.map((tab) => (
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
                          className="text-sm flex flex-grow">
                          {option}
                        </label>
                        <input
                          type="checkbox"
                          className="shrink-0 border-2 rounded bg-pink text-primary focus:ring-purple disabled:opacity-50 disabled:pointer-events-none"
                          id={`checkbox-${option}`}
                          disabled={
                            !!tab.name &&
                            !!tab.maxSelections &&
                            !selections[tab.name].includes(option) &&
                            selections[tab.name].length >= tab.maxSelections
                          }
                          onChange={() => {
                            if (!tab.name) return
                            updateSelection(tab.name, option)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col bg-pink border border-pink shadow-sm rounded-xl p-4 md:p-5">
                    This is some text within a card body 2.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex md:w-1/6 justify-end">
        <div className="flex flex-col justify-end md:mb-10">
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

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

interface Props {
  selections: Selections
  progress: number
  onRemovePrompt: (key: SelectionKey, value: string) => void
}

export default function ImageReviewScreen({
  progress,
  selections,
  onRemovePrompt,
}: Props) {
  const styles = {
    icons: {
      fontSize: '20px',
    },
  }

  const icons = {
    imageStyle: 'image',
    hairColor: 'ar_stickers',
    hairStyle: 'ar_stickers',
    height: 'ar_stickers',
    build: 'ar_stickers',
    skinTone: 'ar_stickers',
    facialFeatures: 'ar_stickers',
    description: 'text_fields',
  }

  const handleRemove = (key: SelectionKey, value: string) => () => {
    onRemovePrompt(key, value)
  }

  return (
    <div className="flex flex-col md:w-2/6 justify-center items-center m-auto">
      {/* Title */}
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
        Almost done. Can you confirm your character prompts?
      </p>
      <div className="flex flex-wrap mt-5 justify-center">
        {Object.entries(selections)
          .filter(([, value]) => !!value.toString())
          .map(([key, value], index) =>
            key === 'imageStyle' ? (
              value.map((val: string) => (
                <span
                  key={index}
                  className="inline-flex items-center m-2 gap-x-1.5 py-1.5 ps-3 pe-2 rounded-md text-sm font-medium bg-pink text-gray-600 border border-gray-500">
                  <span
                    className="material-symbols-outlined"
                    style={styles.icons}>
                    {icons[key]}
                  </span>
                  {val}
                  <button
                    type="button"
                    className="shrink-0 size-6 inline-flex items-center justify-center rounded-full focus:outline-none"
                    onClick={handleRemove(key as SelectionKey, val)}>
                    <span className="sr-only">Remove prompt</span>
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </span>
              ))
            ) : (
              <span
                key={index}
                className="inline-flex items-center m-2 gap-x-1.5 py-1.5 ps-3 pe-2 rounded-md text-sm font-medium bg-pink text-gray-600 border border-gray-500">
                <span
                  className="material-symbols-outlined"
                  style={styles.icons}>
                  {icons[key as SelectionKey]}
                </span>
                {value}
                <button
                  type="button"
                  className="shrink-0 size-6 inline-flex items-center justify-center rounded-full focus:outline-none"
                  onClick={handleRemove(key as SelectionKey, value)}>
                  <span className="sr-only">Remove prompt</span>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </span>
            )
          )}
      </div>
    </div>
  )
}

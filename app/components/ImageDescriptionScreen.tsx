import Image from 'next/image'
import { ChangeEvent } from 'react'

interface Props {
  progress: number
  maxWords: number
  description: string
  onUpdateDescription: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export default function ImageDescriptionScreen({
  progress,
  maxWords,
  description,
  onUpdateDescription,
}: Props) {
  return (
    <div className="flex flex-col md:w-2/6 justify-center items-center mx-auto my-10">
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
        Awesome! How would you describe your character?
      </p>
      {/* Description */}
      <div className="md:w-80 w-full mt-5">
        <textarea
          id="hs-textarea-with-corner-hint"
          className="mb-2 py-3 px-4 block w-full bg-tertiary border-gray-300 rounded-lg text-sm focus:border-purple focus:ring-purple disabled:opacity-50 disabled:pointer-events-none shadow-md"
          rows={3}
          placeholder="Additional character description..."
          value={description}
          onChange={onUpdateDescription}></textarea>
        <span className="flex w-40 rounded py-1 pl-2 bg-gray-800 mb-2 text-xs text-white">
          {`${maxWords} words left`}
        </span>
      </div>
    </div>
  )
}

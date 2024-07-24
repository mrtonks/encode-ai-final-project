import Image from 'next/image'
import { ChangeEvent } from 'react'

interface Props {
  progress: number
  name: string
  characterImage: string
  onUpdateName: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function BackstoryNameScreen({
  progress,
  name,
  characterImage,
  onUpdateName,
}: Props) {
  return (
    <div className="flex flex-col m-auto md:w-2/6 md:px-10 w-full items-center">
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
      <p className="md:text-4xl text-lg font-sans font-bold text-center mb-3">
        What is the character&apos;s name?
      </p>
      <div className="md:w-80 w-full my-5">
        <input
          id="name"
          className="mb-2 py-3 px-4 block w-full bg-purple-light border-gray-300 rounded-lg text-sm focus:border-purple focus:ring-purple disabled:opacity-50 disabled:pointer-events-none shadow-md"
          placeholder="Character's name..."
          value={name}
          onChange={onUpdateName}
        />
      </div>
      <div className="flex md:w-9/12 w-full">
        <Image
          src={characterImage || '/images/character-image-sample.png'}
          alt="Character image"
          width={500}
          height={500}
          layout="responsive"
        />
      </div>
    </div>
  )
}

import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'

interface Props {
  progress: number
  base64Image: string
  isDownloading: boolean
  isLoading: boolean
  onDownload: () => void
  onRegenerateImage: (prompts: string, negativePrompts?: string) => void
  onStartBackstory: () => void
}

export default function ImageCompletedScreen({
  progress,
  base64Image,
  isDownloading,
  isLoading,
  onDownload,
  onRegenerateImage,
  onStartBackstory,
}: Props) {
  const [openEditTraits, setOpenEditTraits] = useState<boolean>(false)
  const [prompts, setPrompts] = useState<string>('')

  const maxWords: number = 75

  const countWords = (value: string): number => {
    let totalWords = 0
    totalWords += value.trim().split(/\s+/).filter(Boolean).length
    return totalWords
  }

  const handleUpdatePrompts = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const words = value.match(/\b\w+\b/g) || [] // Match only words

    if (words.length <= maxWords) {
      setPrompts(value)
    } else {
      // Prevent additional input by ignoring the new value
      event.preventDefault()
    }
  }

  return (
    <div
      className={`flex ${
        openEditTraits
          ? 'h-full md:flex-row flex-col m-auto md:gap-20'
          : 'flex-col m-auto'
      }`}>
      <div
        className={`flex flex-col justify-center items-center my-10 mx-auto ${
          openEditTraits ? 'md:w-3/6' : 'md:w-4/6'
        }`}>
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
        <p className="md:text-4xl text-lg font-sans font-bold text-center mb-3">
          Yay! Let me introduce to your character...
        </p>
        <div className="flex flex-col w-4/6">
          {isLoading ? (
            <span
              className="animate-spin inline-block size-20 border-[3px] border-current border-t-transparent text-primary rounded-full self-center"
              role="status"
              aria-label="loading">
              <span className="sr-only">Loading...</span>
            </span>
          ) : (
            <Image
              src={base64Image}
              alt="Character image"
              width={500}
              height={500}
              layout="responsive"
            />
          )}
        </div>
        {!isLoading && (
          <div className="inline-flex mt-3 gap-3">
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-tertiary text-primary hover:bg-pink-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-md"
              disabled={isDownloading}
              onClick={onDownload}>
              <span className="material-symbols-outlined">download</span>
              Download
            </button>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-tertiary text-primary hover:bg-pink-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-md"
              onClick={() => setOpenEditTraits(true)}>
              <span className="material-symbols-outlined">edit_note</span>
              Edit traits
            </button>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-tertiary text-primary hover:bg-pink-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-md"
              onClick={onStartBackstory}>
              <span className="material-symbols-outlined">heart_plus</span>
              Backstory
            </button>
          </div>
        )}
      </div>
      {openEditTraits && (
        <div className="flex flex-col md:w-3/6 md:my-auto mb-3">
          <div className="flex flex-row justify-between">
            <span className="flex w-28 self-end rounded py-1 pl-2 bg-gray-800 mb-2 text-xs text-white">
              {`${maxWords - countWords(prompts)} words left`}
            </span>
            <div
              className="text-primary cursor-pointer"
              onClick={() => {
                setOpenEditTraits(false)
                setPrompts('')
              }}>
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>
          <div className="flex flex-col">
            <textarea
              id="hs-textarea-with-corner-hint"
              className="mb-2 py-3 px-4 block w-full bg-tertiary border-gray-300 rounded-lg text-sm focus:border-purple focus:ring-purple disabled:opacity-50 disabled:pointer-events-none shadow-md"
              rows={3}
              placeholder="Additional character description..."
              value={prompts}
              onChange={handleUpdatePrompts}></textarea>
            <div className="flex flex-row justify-around">
              <button
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-tertiary text-primary hover:bg-pink-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-md"
                disabled={!prompts}
                onClick={() => {
                  setOpenEditTraits(false)
                  onRegenerateImage(prompts)
                  setPrompts('')
                }}>
                <span className="material-symbols-outlined">add</span>
                Add traits
              </button>
              <button
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-tertiary text-primary hover:bg-pink-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-md"
                disabled={!prompts}
                onClick={() => {
                  setOpenEditTraits(false)
                  onRegenerateImage('', prompts)
                  setPrompts('')
                }}>
                <span className="material-symbols-outlined">close</span>
                Remove traits
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

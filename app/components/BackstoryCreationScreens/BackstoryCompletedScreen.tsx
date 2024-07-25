import Image from 'next/image'
import { useState } from 'react'

interface Props {
  progress: number
  generatedStory: string
  isLoading: boolean
  onDownload: () => void
  onRegeneration: (chat: string) => void
}

export default function BackstoryCompletedScreen({
  progress,
  generatedStory,
  isLoading,
  onDownload,
  onRegeneration,
}: Props) {
  const [openEditStory, setOpenEditStory] = useState<boolean>(false)
  const [chat, setChat] = useState<string>('')

  return (
    <div
      className={`flex justify-center flex-grow ${
        openEditStory ? 'md:flex-row flex-col md:gap-24 gap-5' : 'flex-col'
      }`}>
      <div
        className={`flex flex-col items-center md:gap-10 gap-5 ${
          openEditStory ? 'md:w-1/3' : 'md-4/6'
        }`}>
        <div
          className={`flex flex-col items-center mt-5 ${
            openEditStory ? 'md:w-3/4' : 'md:w-1/4'
          }`}>
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
            Your character&apos;s backstory was crafted
          </p>
        </div>
        <div
          className={`flex justify-center ${
            !openEditStory && 'md:w-1/2'
          }  w-full`}>
          {isLoading ? (
            <span
              className="animate-spin inline-block size-20 border-[3px] border-current border-t-transparent text-primary rounded-full self-center"
              role="status"
              aria-label="loading">
              <span className="sr-only">Loading...</span>
            </span>
          ) : (
            <textarea
              id="hs-textarea-with-corner-hint"
              className="mb-2 py-3 px-4 block w-full bg-purple-light border-gray-300 rounded-lg text-sm focus:border-purple focus:ring-purple disabled:pointer-events-none shadow-md"
              rows={13}
              value={generatedStory}
              readOnly></textarea>
          )}
        </div>
        {!isLoading && (
          <div className="flex flex-row gap-3">
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-tertiary text-primary hover:bg-pink-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-md"
              onClick={onDownload}>
              <span className="material-symbols-outlined">download</span>
              Download
            </button>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-tertiary text-primary hover:bg-pink-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-md"
              onClick={() => setOpenEditStory(true)}>
              <span className="material-symbols-outlined">edit_note</span>
              Edit story
            </button>
          </div>
        )}
      </div>
      {openEditStory && (
        <div className="flex flex-col md:w-1/3 md:my-auto mb-3">
          <div className="flex flex-row justify-end">
            <div
              className="text-primary cursor-pointer"
              onClick={() => setOpenEditStory(false)}>
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>
          <div className="flex flex-col">
            <textarea
              id="chat"
              className="mb-2 py-3 px-4 block w-full bg-tertiary border-gray-300 rounded-lg text-sm focus:border-purple focus:ring-purple disabled:opacity-50 disabled:pointer-events-none shadow-md"
              rows={3}
              placeholder="Additional story description..."
              onChange={(e) => {
                setChat(e.target.value)
              }}></textarea>
            <div className="flex flex-row justify-end">
              <button
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-tertiary text-primary hover:bg-pink-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-md"
                onClick={() => {
                  setOpenEditStory(false)
                  onRegeneration(chat)
                }}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

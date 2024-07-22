import Image from 'next/image'
import { useState } from 'react'

interface Props {
  progress: number
}

export default function ImageCompletedScreen({ progress }: Props) {
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [base64Image, setBase64Image] = useState<string>('')

  const handleDownload = () => {
    setIsDownloading(true)
    const link = document.createElement('a')
    link.href = base64Image
    link.download = 'character-image-sample.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsDownloading(false)
  }

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
      <p className="md:text-4xl text-lg font-sans font-bold text-center mb-3">
        Yay! Let me introduce to your character...
      </p>
      <div className="flex flex-col w-4/6">
        <Image
          src="/images/character-image-sample.png"
          alt="Character image"
          width={500}
          height={500}
          layout="responsive"
        />
      </div>
      <div className="inline-flex mt-3 gap-3">
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-tertiary text-primary hover:bg-pink-200 focus:outline-none focus:bg-pink-200 disabled:opacity-50 disabled:pointer-events-none"
          disabled={isDownloading}
          onClick={handleDownload}>
          <span className="material-symbols-outlined">download</span>
          Download
        </button>
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-tertiary text-primary hover:bg-pink-200 focus:outline-none focus:bg-pink-200 disabled:opacity-50 disabled:pointer-events-none">
          <span className="material-symbols-outlined">edit_note</span>
          Edit traits
        </button>
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-tertiary text-primary hover:bg-pink-200 focus:outline-none focus:bg-pink-200 disabled:opacity-50 disabled:pointer-events-none">
          <span className="material-symbols-outlined">heart_plus</span>
          Backstory
        </button>
      </div>
    </div>
  )
}

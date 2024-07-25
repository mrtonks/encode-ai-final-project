import FormData from 'form-data'
import fetch from 'node-fetch'

// As an improvement we could use a combination of different API keys and engineId to allow for different models
const engineId = 'stable-diffusion-v1-6'
const apiHost = process.env.IMAGE_API_HOST ?? 'https://api.stability.ai'
const apiKey = process.env.IMAGE_API_KEY

if (!apiKey) throw new Error('Missing API key.')

const base64ToBuffer = (base64: string): Buffer => {
  return Buffer.from(base64.split(',')[1], 'base64')
}

export async function POST(req: Request) {
  const { prompt, image } = await req.json()

  try {
    const imageBuffer = base64ToBuffer(image)
    const formData = new FormData()
    formData.append('init_image', imageBuffer, {
      filename: 'image.png',
      contentType: 'image/png',
    })
    formData.append('text_prompts[0][text]', prompt)
    formData.append('init_image_mode', 'IMAGE_STRENGTH')
    formData.append('image_strength', 0.5)
    formData.append('cfg_scale', 7)
    formData.append('samples', 1)
    formData.append('steps', 30)

    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/image-to-image`,
      {
        method: 'POST',
        headers: {
          ...formData.getHeaders(),
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`)
    }

    interface GenerationResponse {
      artifacts: Array<{
        base64: string
        seed: number
        finishReason: string
      }>
    }

    const data = (await response.json()) as GenerationResponse
    const base64Image = `data:image/png;base64,${data.artifacts[0].base64}`

    return new Response(base64Image)
  } catch (error) {
    throw new Error('The image was not generated.')
  }
}

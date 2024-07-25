// As an improvement we could use a combination of different API keys and engineId to allow for different models
const engineId = 'stable-diffusion-v1-6'
const apiHost = process.env.IMAGE_API_HOST ?? 'https://api.stability.ai'
const apiKey = process.env.IMAGE_API_KEY

if (!apiKey) throw new Error('Missing API key.')

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/text-to-image`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
          },
        ],
        cfg_scale: 7,
        height: 512,
        width: 512,
        steps: 15,
        samples: 1,
      }),
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
}

// As an improvement we could use a combination of different API keys and engineId to allow for different models
const engineId = 'stable-diffusion-v1-6'
const apiHost = process.env.IMAGE_API_HOST ?? 'https://api.stability.ai'
const apiKey = process.env.IMAGE_API_KEY

if (!apiKey) throw new Error('Missing API key.')

export async function POST(req: Request) {
   const { prompt, image } = await req.json()

   const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/image-to-image`,
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
          image_strength: 0.75,
          init_image: image,
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

   let data = await response.json()
   return new Response(data)

}
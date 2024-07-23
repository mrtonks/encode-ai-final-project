import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
   baseURL: 'http://127.0.0.1:5000/v1',
})

export const runtime = 'edge'

export async function POST(req: Request) {
   const { messages } = await req.json()
   const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      // TO DO: Add context if neccessary
      messages: [...messages],
   })
   // Convert the response into a friendly text-stream
   const stream = OpenAIStream(response)
   // Respond with the stream
   return new StreamingTextResponse(stream)

}
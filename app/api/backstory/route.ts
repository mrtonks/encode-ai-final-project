import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client (that's edge friendly!)

const openai = new OpenAI()

export const runtime = 'edge'


//const openai = new OpenAI({
//   baseURL: 'http://127.0.0.1:5000/v1',
//})


export async function POST(req: Request) {
   const { messages } = await req.json()

   const stream = await openai.beta.threads.createAndRun({
      assistant_id: process.env.OPENAI_ASSISTANT_ID || '',
      stream: true,
      thread: { messages },
   })

   // Start an encoded stream
   const encoder = new TextEncoder()
   const streamResponse = new ReadableStream({
      async start(controller) {
         for await (const event of stream) {
         // Check only for events of type `delta` and extract the content text
         if (
            event.event === 'thread.message.delta' &&
            !!event.data.delta.content &&
            event.data.delta.content[0].type === 'text'
         ) {
            const textChunk = event.data.delta.content[0].text?.value
            controller.enqueue(encoder.encode(textChunk))
         }
         }
         controller.close()
      },
   })

  return new StreamingTextResponse(streamResponse)

}
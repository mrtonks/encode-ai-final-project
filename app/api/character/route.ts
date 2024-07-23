export async function POST(req: Request) {
   const { message } = await req.json()
   // TODO: check if image prompt works
   const response = await fetch('http://127.0.0.1:7860/sdapi/v1/txt2img',{
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         prompt: message,
         steps: 5,
      }),
   })

   let data = await response.json()
   return new Response(data)

}
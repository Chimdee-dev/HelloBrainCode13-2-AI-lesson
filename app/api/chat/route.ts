import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

console.log('🔑 Gemini API Key exists:', !!process.env.GEMINI_API_KEY)
console.log('🔑 API Key length:', process.env.GEMINI_API_KEY?.length || 0)

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

console.log('✅ Gemini client initialized successfully')

export async function POST(req: NextRequest) {
  try {
    console.log('📨 Received POST request to /api/chat')
    const { messages } = await req.json()
    console.log('💬 Messages received:', messages.length, 'messages')

    // Convert OpenAI format to Gemini format
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))
    
    const lastMessage = messages[messages.length - 1].content

    console.log('🚀 Creating Gemini stream...')
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' })
    const chat = model.startChat({ history })
    const result = await chat.sendMessageStream(lastMessage)
    console.log('✅ Gemini stream created successfully')

    const encoder = new TextEncoder()

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          console.log('📡 Starting to stream response...')
          for await (const chunk of result.stream) {
            const text = chunk.text()
            const data = `data: ${JSON.stringify({ 
              choices: [{ 
                delta: { content: text } 
              }] 
            })}\n\n`
            controller.enqueue(encoder.encode(data))
          }
          console.log('✅ Stream completed successfully')
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('❌ Stream error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('❌ API Error:', error)
    console.error('❌ Error message:', error.message)
    console.error('❌ Error stack:', error.stack)
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}


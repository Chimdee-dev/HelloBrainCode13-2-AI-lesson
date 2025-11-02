# ChatGPT Clone

A fully functional ChatGPT clone built with Next.js, React, TypeScript, and the OpenAI API.

## Features

- 🎨 Exact ChatGPT UI design match
- 💬 Real-time streaming chat responses
- 📚 Conversation history management
- 🎯 Multiple conversations support
- 💾 Persistent conversation state
- 🎭 Markdown rendering for AI responses

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # OpenAI API integration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── ChatInterface.tsx         # Chat interface component
│   ├── InputArea.tsx             # Input area with send button
│   ├── MessageBubble.tsx         # Message display component
│   └── Sidebar.tsx               # Sidebar with conversations
└── package.json
```

## Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **OpenAI API** - GPT-3.5-turbo for chat completions
- **React Markdown** - Markdown rendering

## Usage

1. Click "New chat" in the sidebar to start a new conversation
2. Type your message in the input area
3. Press Enter or click the send button to send your message
4. The AI response will stream in real-time
5. Manage multiple conversations from the sidebar

Enjoy your ChatGPT clone!

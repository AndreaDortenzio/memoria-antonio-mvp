import { useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')

  async function sendMessage() {
    if (!input) return
    setMessages([...messages, input])
    const res = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    })
    const data = await res.json()
    setMessages(msgs => [...msgs, data.response])
    setInput('')
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Chat</h1>
      <div className="space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-2 bg-gray-100 rounded">{msg}</div>
        ))}
      </div>
      <div className="flex space-x-2 mt-4">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Say something..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  )
}

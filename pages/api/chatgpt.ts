import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import data from '../../data/antonio.json'

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }))

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const { message } = req.body
    const context = data.memories.map((m: any) => m.text).join('\n')
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `Context:\n${context}` },
        { role: 'user', content: message }
      ]
    })
    const reply = completion.data.choices[0]?.message?.content || ''
    res.status(200).json({ response: reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch from OpenAI' })
  }
}

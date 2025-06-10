import InsightBlock from './InsightBlock'
import PromptCard from './PromptCard'
import data from '../data/antonio.json'

export default function Feed() {
  const memories = data.memories || []
  return (
    <div className="space-y-4">
      {memories.map((mem, idx) => (
        <InsightBlock key={idx} memory={mem} />
      ))}
      <PromptCard />
    </div>
  )
}

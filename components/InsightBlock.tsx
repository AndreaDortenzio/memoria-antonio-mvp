interface Props {
  memory: { date: string; text: string }
}

export default function InsightBlock({ memory }: Props) {
  return (
    <div className="p-4 border rounded">
      <p className="text-xs text-gray-500">{memory.date}</p>
      <p>{memory.text}</p>
    </div>
  )
}

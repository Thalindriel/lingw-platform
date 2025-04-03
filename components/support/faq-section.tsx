interface FAQSectionProps {
  question: string
  answer: string
}

export function FAQSection({ question, answer }: FAQSectionProps) {
  return (
    <div className="bg-primary/10 p-4 rounded-lg">
      <h3 className="font-medium mb-2">{question}</h3>
      <p className="text-sm text-gray-700">{answer}</p>
    </div>
  )
}


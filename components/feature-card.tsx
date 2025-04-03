import Image from "next/image"

interface FeatureCardProps {
  title: string
  description: string
  imageSrc: string
  bgColor: string
}

export function FeatureCard({ title, description, imageSrc, bgColor }: FeatureCardProps) {
  return (
    <div className={`${bgColor} rounded-lg p-6`}>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} width={80} height={80} className="rounded-lg" />
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-700 text-sm flex-grow">{description}</p>
      </div>
    </div>
  )
}


import Image from "next/image"

interface TeacherCardProps {
  name: string
  experience: string
  imageSrc: string
}

export function TeacherCard({ name, experience, imageSrc }: TeacherCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-36 h-36 rounded-full overflow-hidden mb-4 relative">
        <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" priority />
      </div>
      <h3 className="font-bold text-center text-lg">{name}</h3>
      <p className="text-sm text-gray-600 text-center">{experience}</p>
    </div>
  )
}


import Image from "next/image"

interface IconProps {
  name: string
  size?: number
  className?: string
}

export function Icon({ name, size = 24, className = "" }: IconProps) {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <Image src={`/assets/img/icons/${name}.svg`} alt={name} width={size} height={size} className="object-contain" />
    </div>
  )
}


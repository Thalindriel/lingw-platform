import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        <Image src="/logo.svg" alt="LingW Logo" fill className="object-contain" priority />
      </div>
      <span className="text-xl font-bold">LingW</span>
    </Link>
  )
}


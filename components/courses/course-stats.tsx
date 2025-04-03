import Image from "next/image"

interface StatItemProps {
  value: string
  label: string
  icon: string
}

function StatItem({ value, label, icon }: StatItemProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md flex items-center hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
        <Image src={`/assets/img/icons/${icon}.svg`} alt={label} width={24} height={24} className="text-primary" />
      </div>
      <div>
        <div className="text-2xl font-extrabold text-primary">{value}</div>
        <div className="text-sm text-gray-600 font-light">{label}</div>
      </div>
    </div>
  )
}

interface CourseStatsProps {
  stats: {
    value: string
    label: string
    icon: string
  }[]
}

export function CourseStats({ stats }: CourseStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {stats.map((stat, index) => (
        <StatItem key={index} value={stat.value} label={stat.label} icon={stat.icon} />
      ))}
    </div>
  )
}


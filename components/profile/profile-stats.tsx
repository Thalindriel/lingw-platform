interface ProfileStatsProps {
  icon: string
  value: string
  label: string
}

export function ProfileStats({ icon, value, label }: ProfileStatsProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex flex-col items-center text-center">
        <div className="text-2xl mb-2">{icon}</div>
        <div className="text-xl font-bold text-gray-800">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  )
}


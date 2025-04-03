import Image from "next/image"

interface BenefitItemProps {
  title: string
  description: string
  icon: string
}

function BenefitItem({ title, description, icon }: BenefitItemProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Image src={`/assets/img/icons/${icon}.svg`} alt={title} width={24} height={24} className="text-primary" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 font-light">{description}</p>
    </div>
  )
}

interface CourseBenefitsProps {
  benefits: {
    title: string
    description: string
    icon: string
  }[]
  title?: string
}

export function CourseBenefits({ benefits, title = "Что вы получите" }: CourseBenefitsProps) {
  return (
    <div className="my-16">
      <h2 className="text-3xl font-extrabold mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <BenefitItem key={index} title={benefit.title} description={benefit.description} icon={benefit.icon} />
        ))}
      </div>
    </div>
  )
}


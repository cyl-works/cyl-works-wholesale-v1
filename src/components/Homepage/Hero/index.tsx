import React from 'react'

export type HeroType = {
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null
}

export const Hero: React.FC<HeroType> = (props) => {
  const { title, description, icon: Icon } = props
  return (
    <div className="wrapper-7xl">
      <div className="bg-primary px-6 py-8 md:px-16 md:py-24">
        <div className="text-primary-foreground flex flex-col items-center justify-center gap-24 text-center text-sm md:hidden">
          <h1 className="font-bold">{title}</h1>
          {Icon && <Icon className="size-24 stroke-[0.5px]" />}
          <p>{description}</p>
        </div>
        <div className="text-primary-foreground hidden text-2xl md:flex md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold">{title}</h1>
            <p>{description}</p>
          </div>
          {Icon && <Icon className="size-24 stroke-[0.5px]" />}
        </div>
      </div>
    </div>
  )
}

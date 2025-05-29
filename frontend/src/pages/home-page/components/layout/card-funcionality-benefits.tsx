import React from 'react'

interface CardFunctionalityProps {
  name: string
  icon: React.ElementType
  describre: string
}

export const CardFunctionalityBenefits = ({ describre, icon: Icon, name }: CardFunctionalityProps) => {
  return (
    <article className="bg-secundaryGreen700 p-4 flex flex-col items-start justify-center gap-4 rounded-[10px]">
      <div className="flex items-center justify-center gap-2">
        <div className="rounded-[10px] flex items-center justify-center p-2 w-[3.5rem] bg-white">
          <Icon />
        </div>
        <h4 className="text-[1.1rem] font-[400] w-[80%] text-white">{name}</h4>
      </div>
      <div className="text-primaryWhite500 text-[1rem]">{describre}</div>
    </article>
  )
}

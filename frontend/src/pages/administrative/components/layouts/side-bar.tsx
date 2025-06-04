'use client'

import { logomonocromatic } from '@/assets/image'
import { LinksSideBarAdministrative } from '@/constants/links-side-bar-adiministrative'
import Image from 'next/image'
import { useState } from 'react'

interface SideBarProps {
  setActiveSection: (section: string) => void
}

export const SideBarAdministrative = ({ setActiveSection }: SideBarProps) => {
  const [selectedButton, setSelectedButton] = useState('city')

  const handleControllSections = (value: string) => {
    setActiveSection(value)
    setSelectedButton(value)
  }

  return (
    <article className="flex min-h-[100vh] w-[20%] flex-col items-start bg-primargreen p-2 max-lg:hidden">
      <div className="justify-centerM flex w-full items-center">
        <Image
          src={logomonocromatic}
          width={600}
          className="w-full"
          alt="Logo CocoTour"
        />
      </div>
      <nav className="mt-14 flex w-full flex-col items-start gap-4">
        {LinksSideBarAdministrative.map((link, index) => {
          const isSelected = selectedButton === link.id

          return (
            <button
              key={index}
              onClick={() => handleControllSections(link.id)}
              className={`flex w-full items-center justify-start gap-4 rounded-[1.1rem] p-2 text-[1.3rem] transition-all duration-300 ${
                isSelected
                  ? 'bg-white text-primargreen'
                  : 'text-white hover:bg-white hover:text-primargreen'
              }`}
            >
              <div className="w-[20%]">
                <link.icon />
              </div>
              <span>{link.name}</span>
            </button>
          )
        })}
      </nav>
    </article>
  )
}

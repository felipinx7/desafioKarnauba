'use client'

import { useState } from 'react'
import Image from 'next/image'
import { logococotourmonochrome } from '@/assets/image'
import { LinksSideBarAdministrative } from '@/constants/links-side-bar-adiministrative'
import { IconeBars } from '@/assets/icons/icon-bars'
import { IconClosed } from '@/assets/icons/icone-closed'

interface SideBarProps {
  setActiveSection: (section: string) => void
}

export const SideBarAdministrativeMobile = ({ setActiveSection }: SideBarProps) => {
  const [selectedButton, setSelectedButton] = useState('city')
  const [isOpen, setIsOpen] = useState(false)

  const handleControllSections = (value: string) => {
    setSelectedButton(value)
    setActiveSection(value)
    setIsOpen(false) 
  }

  return (
    <>
      {/* Botão flutuante para abrir/fechar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[40px] h-[40px] block md:hidden"
      >
        {isOpen ? <IconClosed /> : <IconeBars />}
      </button>

      {/* Menu lateral mobile */}
      {isOpen && (
        <aside className="fixed left-0 top-0 z-40 h-full w-[75%] bg-primargreen p-4 md:hidden">
          <Image
            src={logococotourmonochrome}
            width={400}
            className="-translate-x-6"
            alt="Logo CocoTour"
          />

          <nav className="mt-10 flex flex-col gap-4">
            {LinksSideBarAdministrative.map((link, index) => {
              const isSelected = selectedButton === link.id

              return (
                <button
                  key={index}
                  onClick={() => handleControllSections(link.id)}
                  className={`flex w-full items-center gap-4 rounded-[1.1rem] p-2 text-[1.1rem] transition-all duration-300 ${
                    isSelected
                      ? 'bg-white text-primargreen'
                      : 'text-white hover:bg-white hover:text-primargreen'
                  }`}
                >
                  <div className="w-[15%]">
                    <link.icon />
                  </div>
                  <span>{link.name}</span>
                </button>
              )
            })}
          </nav>
        </aside>
      )}
    </>
  )
}

'use client'

import { IconClosed } from '@/assets/icons/icone-closed'
import { logomonocromatic } from '@/assets/image'
import Image from 'next/image'
import { useState } from 'react'

export const SideBarCliente = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <header className="relative z-10 flex w-full items-center justify-center px-5 py-8">
      {/* DESKTOP HEADER */}
      <div className="m-auto hidden w-full max-w-[1280px] items-center justify-between rounded-[1.6rem] bg-primargreen px-4 py-4 lg:flex">
        <Image src={logomonocromatic} width={170} alt="logo do sistema" />
        <nav className="flex gap-8 text-[1.2rem] font-semibold text-white">
          <a href="#home">Início</a>
          <a href="/taxi">Taxistas</a>
          <a href="#explorer">Explorar</a>
          <a href="/about-city">Sobre a cidade</a>
          
        </nav>
      </div>

      {/* MOBILE HEADER */}
      <div className="fixed left-1/2 top-0 z-50 mt-4 flex w-[95%] -translate-x-1/2 items-center justify-between rounded-[1.6rem] bg-primargreen px-4 py-4 lg:hidden">
        <Image src={logomonocromatic} width={150} alt="logo do sistema" />

        <button onClick={handleToggleMenu} aria-label="Abrir menu" className="w-[2.5rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M4 12h16" />
            <path d="M4 18h16" />
            <path d="M4 6h16" />
          </svg>
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed right-0 top-0 z-[99999] h-full w-[70%] max-w-[300px] transform bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* BOTÃO FECHAR */}
        <div className="mb-6 flex justify-end">
          <button onClick={handleToggleMenu} className="w-[2.5rem]" aria-label="Fechar menu">
            <IconClosed />
          </button>
        </div>

        {/* LINKS DO MENU */}
        <nav className="flex flex-col gap-6 text-[1.1rem] font-semibold text-primargreen">
          <a href="#home" onClick={handleToggleMenu}>
            Início
          </a>
          <a href="/taxi">
           Taxistas

          </a>
          <a href="#explorer" onClick={handleToggleMenu}>
            Explorar
          </a>

          <a href="/about-city" onClick={handleToggleMenu}>
            Sobre a cidade
          </a>

        </nav>
      </div>

      {/* BACKDROP */}
      {isMenuOpen && (
        <div
          onClick={handleToggleMenu}
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
        />
      )}
    </header>
  )
}

'use client'

import { IconeBars } from '@/assets/icons/icon-bars'
import { IconClosed } from '@/assets/icons/icone-closed'
import { imageLogo } from '@/assets/image'
import { LinksSideBar } from '@/constants/links-side-bar'
import Image from 'next/image'
import { useState } from 'react'

export const NavBar = () => {
  // State to control the side menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  //Function manipulate of visibility menu
  const handleVisibilityMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <header className="relative z-10 w-full px-5 py-[2.5rem]">
      {/* DESKTOP AND LAPTOP NAVIGATION */}
      <div className="m-auto hidden max-w-[1280px] items-center justify-between rounded-[20px] bg-white p-4 lg:flex">
        <Image src={imageLogo} alt="Logo of sistem" width={200} />
        {/* Navigation links */}
        <nav
          className="text-primargreen flex list-none gap-10 whitespace-nowrap text-[1.2rem] font-[700]"
          aria-label="Navigation main"
        >
          {LinksSideBar.map((link, index) => (
            <a key={index} href={link.href} className="transition-all duration-300">
              {link.nome}
            </a>
          ))}
        </nav>

        {/* Contact button */}
        <button
          className="bg-primargreen rounded px-6 py-4 text-[1rem] font-bold text-white"
          aria-label="Contact us"
        >
          CONTATE-NOS
        </button>
      </div>

      {/* MOBILE NAV HEADER */}
      <div className="m-auto flex max-w-[1240px] items-center justify-between rounded-[20px] bg-white p-4 lg:hidden">
        <Image src={imageLogo} alt="Logo" width={150} />

        {/* Menu open button (hamburger icon) */}
        <button
          onClick={handleVisibilityMenu}
          className="w-[2.7rem]"
          aria-label="Open menu"
          aria-controls="mobile-menu"
        >
          <IconeBars />
        </button>
      </div>

      {/* MOBILE SIDE MENU */}
      <div
        className={`fixed right-0 top-0 z-40 h-full w-[70%] max-w-[300px] transform bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button inside the menu */}
        <div className="mb-6 flex justify-end">
          <button onClick={handleVisibilityMenu} className="w-[2.7rem] text-2xl">
            <IconClosed />
          </button>
        </div>

        {/* Navigation links inside the menu */}
        <nav className="text-primargreen flex flex-col gap-6 text-[1.1rem] font-bold">
          {LinksSideBar.map((link, index) => (
            <a key={index} href={link.href} onClick={handleVisibilityMenu}>
              {link.nome}
            </a>
          ))}
        </nav>

        {/* Contact button inside the menu */}
        <button
          aria-label="Contact us"
          className="bg-primargreen mt-10 w-full rounded-md px-4 py-3 font-bold text-white"
        >
          CONTATE-NOS
        </button>
      </div>

      {/* BACKDROP (Click outside the menu to close it) */}
      {isMenuOpen && (
        <div
          onClick={handleVisibilityMenu}
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
        />
      )}
    </header>
  )
}

'use client'

import { useState } from 'react'
import { SideBarAdministrative } from './components/layouts/side-bar'
import { SectionCity } from './sections/section-city'
import { SectionEvents } from './sections/section-events'
import { SectionLocation } from './sections/section-location'
import { NameAdminstrative } from './components/layouts/header-info-adm'

export const PageAdiminstrative = () => {
  const [activeSection, setActiveSection] = useState('city')

  return (
    <section className="flex min-h-screen w-full max-lg:flex-col max-lg:gap-1">
      <SideBarAdministrative setActiveSection={setActiveSection} />
      
      <div className="hidden max-lg:block max-md:w-full">
        <NameAdminstrative setActiveSection={setActiveSection} SibeBarMobile={true} />
      </div>

      {/* ÁREA COM SCROLL */}
      <div className="h-screen overflow-y-auto w-[80%] p-4 max-lg:w-full">
        {activeSection === 'city' && <SectionCity />}
        {activeSection === 'events' && <SectionEvents />}
        {activeSection === 'location' && <SectionLocation />}
      </div>
    </section>
  )
}

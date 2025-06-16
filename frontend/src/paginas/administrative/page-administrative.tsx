'use client'

import { useState } from 'react'
import { SideBarAdministrative } from './components/layouts/side-bar'
import { SectionCity } from './sections/section-city'
import { SectionEvents } from './sections/section-events'
import { SectionLocation } from './sections/section-location'
import { SectionTaxi } from './sections/section-taxis'
import { NameAdminstrative } from './components/layouts/header-info-adm'
import { SectionRoom } from './sections/section-room'

export const PageAdiminstrative = () => {
  const [activeSection, setActiveSection] = useState('city')

  return (
    <section className="flex min-h-screen w-full max-lg:flex-col max-lg:gap-1">
      <SideBarAdministrative setActiveSection={setActiveSection} />

      <div className="hidden max-lg:block max-md:w-full">
        <NameAdminstrative setActiveSection={setActiveSection} SibeBarMobile={true} />
      </div>

      {/* ÁREA COM SCROLL */}
      <div className="h-screen w-[80%] overflow-y-auto p-4 max-lg:w-full">
        {activeSection === 'city' && <SectionCity />}
        {activeSection === 'events' && <SectionEvents />}
        {activeSection === 'location' && <SectionLocation />}
        {activeSection === 'taxis' && <SectionTaxi />}
        {activeSection === 'room' && <SectionRoom />}
      </div>
    </section>
  )
}

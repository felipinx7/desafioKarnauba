'use client'

import { useState } from 'react'
import { SideBarAdministrative } from './components/side-bar'
import { SectionCity } from './sections/section-city'
import { SectionEvents } from './sections/section-events'
import { SectionLocation } from './sections/section-location'

export const PageAdiminstrative = () => {
  const [activeSection, setActiveSection] = useState('city')

  return (
    <section className="flex min-h-[100vh] w-full">
      <SideBarAdministrative setActiveSection={setActiveSection} />
      
      <div className="w-full p-4">
        {activeSection === 'city' && <SectionCity />}
        {activeSection === 'events' && <SectionEvents />}
        {activeSection === 'location' && <SectionLocation />}
      </div>
    </section>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import { getAdmin } from '@/services/routes/admin/get-admin'
import { SideBarAdministrativeMobile } from './side-bar-adiministrative-mobile'

interface NameAdministrativeProps {
  setActiveSection?: (section: string) => void
  SibeBarMobile?: boolean
}

export const NameAdminstrative = ({ setActiveSection, SibeBarMobile }: NameAdministrativeProps) => {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    const fetchAdminName = async () => {
      const admin = await getAdmin()
      console.log()
      if (admin?.name) {
        setName(admin.name)
      }
    }

    fetchAdminName()
  }, [])

  return (
    <div className="flex w-full items-start justify-between px-2 py-5 text-[2.2rem] max-lg:justify-between max-md:w-full">
      <div>
        <p className="text-primargreen">
          Olá, <span className="font-bold">{name ?? 'Carregando...'}</span>
        </p>
      </div>
      {setActiveSection && (
        <div className={`${SibeBarMobile ? 'block' : 'hidden'}`}>
          <SideBarAdministrativeMobile setActiveSection={setActiveSection} />
        </div>
      )}
    </div>
  )
}

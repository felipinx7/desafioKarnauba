'use client'

import { useEffect, useState } from 'react'
import { getAdmin } from '@/services/routes/getAdmin'

export const NameAdminstrative = () => {
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
    <div className="w-[calc(100%-20%)] flex items-start justify-start px-2 py-5 text-[2.2rem]">
      <p className="text-primargreen">
        Olá, <span className="font-bold">{name ?? 'Carregando...'}</span>
      </p>
    </div>
  )
}

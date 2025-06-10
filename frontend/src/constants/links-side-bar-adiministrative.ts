import { IconBedSmall } from '@/assets/icons/icon-bed-small'
import { IconCalendar } from '@/assets/icons/icon-calendar'
import { IconCity } from '@/assets/icons/icon-city'
import { IconLocation } from '@/assets/icons/icon-location'
import { IconTaxi } from '@/assets/icons/icon-taxi'
import React from 'react'

interface LinksSideBarAdministrativeProps {
  id: string
  name: string
  icon: React.ElementType
}

export const LinksSideBarAdministrative: LinksSideBarAdministrativeProps[] = [
  { id: 'city', name: 'Cidade', icon: IconCity },
  { id: 'events', name: 'Eventos', icon: IconCalendar },
  { id: 'location', name: 'Locais', icon: IconLocation },
  { id: 'taxis', name: 'Taxis', icon: IconTaxi },
  {id: 'room', name: 'Quarto', icon: IconBedSmall}
]

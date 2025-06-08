import { IconBed } from '@/assets/icons/icon-bed'
import { IconCalendary } from '@/assets/icons/icon-calendary'
import { IconCamera } from '@/assets/icons/icon-camera'
import { IconFork } from '@/assets/icons/icon-fork'
import { IconMontain } from '@/assets/icons/icon-montain'
import { IconTaxi } from '@/assets/icons/icon-taxi'
import React from 'react'

interface LinksButtonPageClienteProps {
  name: string
  Icon: React.ElementType
  href: string
}

export const LinksButtonPageCliente: LinksButtonPageClienteProps[] = [
  {
    name: 'Destinos',
    Icon: IconMontain,
    href: '#destination',
  },
  {
    name: 'Restaurantes',
    Icon: IconFork,
    href: '#restaurant',
  },
  {
    name: 'Hospedagens',
    Icon: IconBed,
    href: '#hotel',
  },
  {
    name: 'Taxistas',
    Icon: IconTaxi,
    href: '/taxi',
  },
  {
    name: 'Atração Turisticas',
    Icon: IconCamera,
    href: '#atraction',
  },
  {
    name: 'Eventos',
    Icon: IconCalendary,
    href: '#events',
  },
]

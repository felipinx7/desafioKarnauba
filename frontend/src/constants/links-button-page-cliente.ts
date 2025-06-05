import { IconCalendary } from '@/assets/icons/icon-calendary'
import { IconeCifraMusica } from '@/assets/icons/icon-cifra-musica'
import { IconFork } from '@/assets/icons/icon-fork'
import { IconePaisage } from '@/assets/icons/icon-paisage'
import React from 'react'

interface LinksButtonPageClienteProps {
  name: string
  Icon: React.ElementType
  href: string
}

export const LinksButtonPageCliente: LinksButtonPageClienteProps[] = [
  {
    name: 'Restaurantes',
    Icon: IconFork,
    href: "#restaurant"
  },
  {
    name: 'Atração Turisticas',
    Icon: IconeCifraMusica,
    href: "#atraction"

  },
  {
    name: 'Eventos',
    Icon: IconCalendary,
    href: "#events"
  },
  {
    name: 'Paisagens',
    Icon: IconePaisage,
    href: "#landscape"
  },
]

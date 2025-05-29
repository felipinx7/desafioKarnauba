import { IconeChecked } from '@/assets/icons/icone-checked'
import { IconMap } from '@/assets/icons/icone-map'
import { IconeNotebook } from '@/assets/icons/icone-notebook'
import React from 'react'

interface InfoCardFunctionalityProps {
  name: string
  Icon: React.ElementType
  describe: string
}

export const InfoCardFunctionality: InfoCardFunctionalityProps[] = [
  {
    name: 'Controle Administrativo Completo',
    Icon: IconeChecked,
    describe:
      'Gerencie de forma prática e segura todos os pontos turísticos, restaurantes, hotéis e eventos da cidade em um único sistema centralizado. Isso facilita a atualização das informações e mantém o conteúdo sempre atual e confiável para os usuários.',
  },
  {
    name: 'Páginas Detalhadas e Atrativas',
    Icon: IconeNotebook,
    describe:
      'Gerencie de forma prática e segura todos os pontos turísticos, restaurantes, hotéis e eventos da cidade em um único sistema centralizado. Isso facilita a atualização das informações e mantém o conteúdo sempre atual e confiável para os usuários.',
  },
  {
    name: 'Integração com Mapas e Contatos Diretos',
    Icon: IconMap,
    describe:
      'Gerencie de forma prática e segura todos os pontos turísticos, restaurantes, hotéis e eventos da cidade em um único sistema centralizado. Isso facilita a atualização das informações e mantém o conteúdo sempre atual e confiável para os usuários.',
  },
]

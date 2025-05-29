import { IconBolt } from '@/assets/icons/icon-bolt'
import { MagnifyingGlass } from '@/assets/icons/icon-magnifying-glass'
import { IconeSmartPhone } from '@/assets/icons/icon-smartphone'
import React from 'react'

interface InfoCardFunctionalityProps {
  name: string
  Icon: React.ElementType
  describe: string
}

export const InfoCardBenefits: InfoCardFunctionalityProps[] = [
  {
    name: 'Ecomizar tempo de pesquisas',
    Icon: MagnifyingGlass,
    describe:
      'Com nosso sistema inteligente e otimizado de busca, você encontra exatamente o que procura  seja um ponto turístico, restaurante ou hotel sem precisar navegar por diversas páginas ou lidar com informações desatualizadas, ganhando tempo e praticidade na sua experiência.',
  },
  {
    name: 'Rápida Descoberta Personalizada ',
    Icon: IconBolt,
    describe:
      'Explore lugares, serviços e experiências cuidadosamente selecionados com base nas suas preferências. Nosso sistema analisa seu comportamento e interesses para oferecer sugestões relevantes, tornando cada navegação mais intuitiva, prática e alinhada ao seu perfil.',
  },
  {
    name: 'Experiência Moderna e Intuitiva',
    Icon: IconeSmartPhone,
    describe:
      'A interface do sistema foi criada com foco na acessibilidade, leitura fluida e design moderno. Isso facilita a navegação para todos, proporcionando uma experiência digital envolvente e profissional, valorizando cultural e turisticamente Moraújo, e destacando seus principais atrativos com elegância.',
  },
]

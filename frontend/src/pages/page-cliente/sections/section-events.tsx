import { useEffect, useState } from 'react'
import { getAllEvents } from '@/services/routes/getAllEvents'
import { dataEventDTO } from '@/dto/data-create-event-DTO'
import { dataCardEvent } from '@/dto/data-card-event'
import { CardEvent } from '../components/card-event'
import { ModalEvents } from '../components/modal-events'

export const SectionEvents = () => {
  const [infoEvents, setInfoEvents] = useState<dataCardEvent[] | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents()

        const eventsArray: dataCardEvent[] = response
          ? Object.values(response).map((event: any) => ({
              name: event.name,
              date: new Date(event.date),
              lastDate: new Date(event.lastDate),
              location: event.location,
              description: event.description,
              active: event.active === 'true' || event.active === true,
              photoURLs: event.photos?.map((p: any) => p.url).join(', ') || '',
              instagram: event.instagram || '',
            }))
          : []

        setInfoEvents(eventsArray)
        console.log('Eventos recebidos da API:', eventsArray)
      } catch (error) {
        console.error('Erro ao buscar eventos:', error)
      }
    }

    fetchEvents()
  }, [])

  return (
    <section className="w-full" id="events">
      <div className="m-auto max-w-[1280px]">
        <h1 className="text-[2rem] font-[700]">Conheça os melhores eventos da cidade</h1>
        <p className="text-[1.1rem] text-[400]">
          Participe da cultura da cidade participando dos melhores eventos
        </p>
        {infoEvents?.map((card) => <CardEvent key={card.name} {...card} />)}
      </div>
    </section>
  )
}

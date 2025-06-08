import { useEffect, useState } from 'react'
import { getAllEvents } from '@/services/routes/events/get-all-events'
import { dataEventDTO } from '@/dto/event/data-create-event-DTO'
import { dataCardEvent } from '@/dto/event/data-card-event-client-page-DTO'
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
              id: event.id,
              name: event.name,
              date: new Date(event.date),
              lastDate: new Date(event.lastDate),
              location: event.location,
              description: event.description,
              active: event.active === 'true' || event.active === true,
              photoURLs: event.photos[0].url,
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
        <h1 className="text-[2rem] text-primargreen font-[700]">Conheça os melhores eventos da cidade</h1>
        <p className="text-[1.1rem] text-primargreen font-[400]">
          Participe da cultura da cidade participando dos melhores eventos
        </p>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {infoEvents?.map((card) => <CardEvent key={card.id} {...card}/>)}
        </div>
      </div>
    </section>
  )
}
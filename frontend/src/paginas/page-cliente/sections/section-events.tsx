import { useEffect, useState } from 'react'
import { getAllEvents } from '@/services/routes/events/get-all-events'
import { dataCardEventClientPage } from '@/dto/event/data-card-event-client-page-DTO'
import { CardEvent } from '../components/card-event'

export const SectionEvents = () => {
  const [infoEvents, setInfoEvents] = useState<dataCardEventClientPage[] | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents()

        const eventsArray: dataCardEventClientPage[] = response
          ? Object.values(response).map((event) => {
              const typedEvent = event as {
                id: string
                name: string
                date: Date
                lastDate: Date
                location: string
                description: string
                active: boolean
                photos: { url: string }[]
                instagram?: string
              }

              return {
                id: typedEvent.id,
                name: typedEvent.name,
                date: new Date(typedEvent.date),
                lastDate: new Date(typedEvent.lastDate),
                location: typedEvent.location,
                description: typedEvent.description,
                active: typedEvent.active,
                photoURLs: typedEvent.photos[0]?.url || '',
                instagram: typedEvent.instagram || '',
              }
            })
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
          {infoEvents?.map((card) => <CardEvent key={card.id} {...card} />)}
        </div>
      </div>
    </section>
  )
}

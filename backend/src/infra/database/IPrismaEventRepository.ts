import { prisma } from "../../config/prisma";
import { Events } from "../../domain/entities/event";
import { IEventRepository } from "../../domain/repositorys/IPlaceEvent";

export class IPrismaEventRepository implements IEventRepository {
    async createEvent(data: Events): Promise<Events | null> {
        const event = await prisma.event.create({
            data: {
                id: data.id ?? '',
                name: data.name,
                date: data.date,
                description: data.description,
                photoURL: data.photoURL,
                instagram: data.instagram,
                cityId: data.cityId,
                active: data.active,
            }
        })
        return event;
    }

    async updateEvent(data: Events): Promise<Events | null> {
        const event = await prisma.event.update({
            where: {id: data.id},
            data: {
                name: data.name,
                date: data.date,
                description: data.description,
                photoURL: data.photoURL,
                instagram: data.instagram,
                cityId: data.cityId,
                active: data.active,
            }
        })

        return event;
    }


    async deleteEvent(id: string): Promise<Events | null> {
        const event = await prisma.event.delete({
            where: {id}
        })

        return event;
    }

    async getEventById(id: string): Promise<Events | null> {
        const event = await prisma.event.findUnique({
            where: {id}
        })

        return event;
    }

    async getAllEvents(): Promise<Events[]> {
        const events = await prisma.event.findMany({})

        return events;
    }
}
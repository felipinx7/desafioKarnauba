import { prisma } from "../../config/prisma";
import { City } from "../../domain/entities/city";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";

export class IPrismaCityRepository implements ICityRepository {
    async createCity(data: City): Promise<City | null> {
        const city = await prisma.city.create({
            data: {
                id: data.id ?? '',
                name: data.name,
                location: data.location,
                description: data.description,
                photoURL: data.photoURL,
                instagram: data.instagram,
                places: {
                    connect: data.places?.map(place => ({ id: place.id }))
                }
            }
        })
        return city;
    }

    async updateCity(data: City): Promise<City | null> {
        const city = await prisma.city.update({
            where: {id: data.id},
            data: {
                name: data.name,
                location: data.location,
                description: data.description,
                photoURL: data.photoURL,
                instagram: data.instagram,
            }
        })

        return city;
    }

    async deleteCity(id: string): Promise<City | null> {
        const city = await prisma.city.delete({
            where: {id}
        })

        return city;
    }

    async existsEventInCity(id: string): Promise<boolean> {
        const existEvents = await prisma.city.findUnique({
            where: {id},
            include: {
                events: true
            }
        })
        if (existEvents?.events.length === 0) return false;
        return true;
    }

    async existsPlaceInCity(id: string): Promise<boolean> {
        const existPlace = await prisma.city.findUnique({
            where: {id},
            include: {
                places: true
            }
        })
        if (existPlace?.places.length === 0) return false;
        return true;
    }

    async getAllCities(): Promise<City[]> {
        const cities = await prisma.city.findMany({
            include: {
                places: true,
                events: true
            }
        })

        return cities
    }

    async findUnique(id: string): Promise<City | null> {
        const city = await prisma.city.findUnique({
            where: {id},
            include: {
                places: true,
                events: true
            }
        })

        return city;
    }
}

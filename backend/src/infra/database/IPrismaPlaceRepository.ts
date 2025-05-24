import { Category, Place } from "@prisma/client";
import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { prisma } from "../../config/prisma";

export class IPrismaPlaceRepository  implements IPlaceRepository {
    async createPlace(data: Place): Promise<Place | null> {
        const place = await prisma.place.create({
            data: {
                id: data.id ?? '',
                name: data.name,
                location: data.location,
                description: data.description,
                photoURL: data.photoURL,
                instagram: data.instagram,
                phone: data.phone,
                category: data.category,
                city: {
                    connect: { id: data.cityId }
                }
            }
        })
        return place;
    }

    async updatePlace(data: Place): Promise<Place | null> {
        const place = await prisma.place.update({
            where: {id: data.id},
            data: {
                name: data.name,
                location: data.location,
                description: data.description,
                photoURL: data.photoURL,
                instagram: data.instagram,
                phone: data.phone ?? null,
                category: data.category,
            }
        })

        return place;
    }

    async deletePlace(id: string): Promise<Place | null> {
        const place = await prisma.place.delete({
            where: {id}
        })

        return place;
    }


    async getPlaceById(id: string): Promise<Place | null> {
        const place = await prisma.place.findUnique({
            where: {id}
        })

        return place;
    }

    async getAllPlaces(): Promise<Place[]> {
        const places = await prisma.place.findMany({})

        return places;
    }

    async getPlacesByCategory(category: Category): Promise<Place[]> {
        const places = await prisma.place.findMany({
            where: {
                category: category
            },
        })

        return places;
    }
}

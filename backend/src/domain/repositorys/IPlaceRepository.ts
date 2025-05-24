import { Category, Place } from "@prisma/client";

export interface IPlaceRepository {
    createPlace(data: Place): Promise<Place | null>;
    updatePlace(data: Place): Promise<Place | null>;
    deletePlace(id: string): Promise<Place | null>;
    getPlaceById(id: string): Promise<Place | null>;
    getAllPlaces(): Promise<Place[]>;
    getPlacesByCategory(category: Category): Promise<Place[]>;
};
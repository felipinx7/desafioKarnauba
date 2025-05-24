import { City } from "../entities/city";

export interface ICityRepository {
    createCity(data: City): Promise<City | null>;
    updateCity(data: City): Promise<City | null>;
    deleteCity(id: string): Promise<City | null>;
    findUnique(id: string): Promise<City | null>;
    getAllCities(): Promise<City[]>;
    existsPlaceInCity(id: string): Promise<boolean>;
    existsEventInCity(id: string): Promise<boolean>;
};
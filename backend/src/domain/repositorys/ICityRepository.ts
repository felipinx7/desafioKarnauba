import { City } from "../entities/city";

export interface ICityRepository {
    createCity(data: City): Promise<City | null>;
    updateCity(data: City): Promise<City | null>;
    deleteCity(id: string): Promise<City | null>;
    getCityById(id: string): Promise<City | null>;
    getCityByName(name: string): Promise<City | null>;
    getAllCities(): Promise<City[]>;
    existsPlaceInCity(): Promise<boolean>;
    existsEventInCity(): Promise<boolean>;
};
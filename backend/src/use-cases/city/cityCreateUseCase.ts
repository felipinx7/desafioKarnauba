import { randomUUID } from "crypto";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { cityDTO } from "../../infra/dto/cityDTO";
import { citySchema } from "../../infra/schemas/citySchema";
import { City } from "../../domain/entities/city";

export class CityCreateUseCase {
    constructor(
        private readonly cityRepository: ICityRepository
    ){}

    async execute(data: cityDTO){
        const parsedData = citySchema.safeParse(data);
        if(!parsedData.success) throw new Error("Bad Request");

        const { name, location, description, photoURL, instagram } = parsedData.data!;
        const id = randomUUID();

        const city = new City(name, location, description, photoURL, id, [], [], instagram);
        await this.cityRepository.createCity(city);

        return city;
    }
}
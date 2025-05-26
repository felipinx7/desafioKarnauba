import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { ServerError } from "../../infra/utils/serverError";

export class CityDeleteUseCase {
    constructor(private readonly cityRepository: ICityRepository){}

    async execute(id: string){
        const isCityExist = await this.cityRepository.findUnique(id);
        if (!isCityExist) throw new ServerError("City not found", 404);
        
        const isCityExistEvents = await this.cityRepository.existsEventInCity(id);
        if (isCityExistEvents) throw new ServerError("This city has events, you can't delete it", 409);

        const isCityExistPlaces = await this.cityRepository.existsPlaceInCity(id);
        if (isCityExistPlaces) throw new ServerError("This city has places, you can't delete it", 409);

        await this.cityRepository.deleteCity(id);
    }
}
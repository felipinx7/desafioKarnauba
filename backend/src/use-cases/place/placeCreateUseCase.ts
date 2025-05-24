import { randomUUID } from "crypto";
import { Place } from "../../domain/entities/places";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { placeDTO } from "../../infra/dto/placeDTO";
import { placeSchema } from "../../infra/schemas/placeSchema";
import { ServerError } from "../../infra/utils/serverError";

export class PlaceCreateUseCase {
    constructor(
        private placeRepository: IPlaceRepository,
        private cityRepository: ICityRepository
    ){}

    async execute(data: placeDTO, cityId: string){
        const parsedData = placeSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const { name, location, description, photoURL, category, phone, instagram } = parsedData.data!

        const isCityExist = await this.cityRepository.findUnique(cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        const id = randomUUID();
        const place = new Place(name, location, description, photoURL, category, cityId, id, phone ?? null, instagram ?? null);

        await this.placeRepository.createPlace(place);
        return place
    }
}

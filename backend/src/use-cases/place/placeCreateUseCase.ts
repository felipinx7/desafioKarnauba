import { randomUUID } from "crypto";
import { Place } from "../../domain/entities/places";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { placeDTO } from "../../infra/dto/placeDTO";
import { placeSchema } from "../../infra/schemas/placeSchema";
import { ServerError } from "../../infra/utils/serverError";
import { FastifyRequest } from "fastify";

export class PlaceCreateUseCase {
    constructor(
        private placeRepository: IPlaceRepository,
        private cityRepository: ICityRepository
    ){}

    async execute(data: placeDTO, req: FastifyRequest){
        const parsedData = placeSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const { name, location, description, photoURLs, category, phone, instagram } = parsedData.data!

        const cityId = req.user?.cityId;
        if (!cityId) throw new ServerError("Not exist city", 404);
        
        const isCityExist = await this.cityRepository.findUnique(cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        const id = randomUUID();
        const photos = photoURLs.map(url => ({
            id: randomUUID(),
            url
        }));

        const place = new Place(name, location, description, category, cityId, id, phone ?? null, instagram ?? null, photos);

        await this.placeRepository.createPlace(place);
        return place
    }
}

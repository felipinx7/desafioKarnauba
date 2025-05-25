import { randomUUID } from "crypto";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { photoSchema } from "../../infra/schemas/photoSchema";
import { ServerError } from "../../infra/utils/serverError";

export class CityCreatePhotoUseCase {
    constructor(
        private cityRepository: ICityRepository
    ){}

    async execute(photoURLs: string, cityId: string){
        const parsedData = photoSchema.safeParse({ photoURLs });
        if (!parsedData) throw new ServerError("Bad request");

        const isCityExist = await this.cityRepository.findUnique(cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        const id = randomUUID();
        const photo = parsedData.data?.photoURLs!

        const photoURL = await this.cityRepository.createPhoto(id, photo, cityId)
        return photoURL;
    }
}
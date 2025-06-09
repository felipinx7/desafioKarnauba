import { FastifyRequest } from "fastify";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { ServerError } from "../../infra/utils/serverError";

export class PlaceFindAllUseCase {
    constructor(
            private placeRepository: IPlaceRepository,
            private readonly adminRepository: IAdminRepository,
            private readonly cityRepository: ICityRepository
    ){}

    async execute(req: FastifyRequest){
        const admin = req.user;
        if (!admin) throw new ServerError("Unauthorized", 401);

        const isAdminExist = await this.adminRepository.getAdminById(admin.id);
        if (!isAdminExist?.cityId) throw new ServerError("Admin does not have a city", 404);

        const isCityExist = await this.cityRepository.findUnique(isAdminExist.cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        const places = await this.placeRepository.getAllPlaces(isCityExist.id);
        const placeLength = places.length > 0;

        if (!places) throw new ServerError("No places found", 404);
        if (!placeLength) throw new ServerError("No places found", 404);
        return places;
    }
}
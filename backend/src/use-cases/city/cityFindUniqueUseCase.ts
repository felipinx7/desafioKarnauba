import { FastifyRequest } from "fastify";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { ServerError } from "../../infra/utils/serverError";

export class CityFindUniqueUseCase {
    constructor(private readonly cityRepository: ICityRepository) {}

    async execute(req: FastifyRequest) {
        const id = req.user?.cityId;
        if (!id) throw new ServerError("Not exist city", 404);

        const city = await this.cityRepository.findUnique(id);
        if (!city) throw new ServerError("City not found", 404);
        return city;
    }
}
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { ServerError } from "../../infra/utils/serverError";

export class CityFindUniqueUseCase {
    constructor(private readonly cityRepository: ICityRepository) {}

    async execute(id: string) {
        const city = await this.cityRepository.findUnique(id);
        if (!city) throw new ServerError("City not found", 404);
        return city;
    }
}
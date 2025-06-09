import { FastifyRequest } from "fastify";
import { ITaxiDriverRepository } from "../../domain/repositorys/ITaxiDriverRepository";
import { ServerError } from "../../infra/utils/serverError";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";

export class TaxiDriverFindAllUseCase {
    constructor(
        private readonly taxiDriverRepository: ITaxiDriverRepository,
        private readonly adminRepository: IAdminRepository,
        private readonly cityRepository: ICityRepository,
    ) {}

    async execute(req: FastifyRequest) {
        const admin = req.user;
        if (!admin) throw new ServerError("Unauthorized", 401);

        const isAdminExist = await this.adminRepository.getAdminById(admin.id);
        if (!isAdminExist?.cityId) throw new ServerError("Admin does not have a city", 404);

        const isCityExist = await this.cityRepository.findUnique(isAdminExist.cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        const taxiDrivers = await this.taxiDriverRepository.getAllTaxiDriversByCityId(isCityExist.id);
        if (!taxiDrivers || taxiDrivers.length === 0) throw new Error("No taxi drivers found");

        return taxiDrivers;
    }
}
import { randomUUID } from "crypto";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { ITaxiDriverRepository } from "../../domain/repositorys/ITaxiDriverRepository";
import { taxiDriverDTO } from "../../infra/dto/taxiDriverDTO";
import { taxiDriverSchema } from "../../infra/schemas/taxiDriverSchema";
import { ServerError } from "../../infra/utils/serverError";
import { TaxiDriver } from "../../domain/entities/taxiDriver";

export class TaxiDriverCreateUseCase {
    constructor(
        private readonly taxiDriverRepository: ITaxiDriverRepository,
        private readonly cityRepository: ICityRepository
    ){}

    async execute(data: taxiDriverDTO, cityId: string) {
        const parsedData = taxiDriverSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const { name, photoURLs, phone, workingDescription } = parsedData.data;

        const city = await this.cityRepository.findUnique(cityId);
        if (!city) throw new ServerError("City not found", 404);

        const id = randomUUID();
        const taxiDriver = new TaxiDriver(id, name, photoURLs, phone, workingDescription, cityId);

        await this.taxiDriverRepository.createTaxiDriver(taxiDriver);
        return taxiDriver; 
    }
}
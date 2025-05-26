import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { cityDTO } from "../../infra/dto/cityDTO";
import { citySchema } from "../../infra/schemas/citySchema";
import { ServerError } from "../../infra/utils/serverError";
import { updateDefineFields } from "../../infra/utils/updateDefinedFields";

export class CityUpdateUseCase {
    constructor(private readonly cityRepository: ICityRepository){}

    async execute(data: cityDTO, id: string){
        const parsedData = citySchema.partial().safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const isCityExist = await this.cityRepository.findUnique(id);
        if (!isCityExist) throw new ServerError("City not found", 404);

        updateDefineFields(isCityExist, parsedData.data);
        await this.cityRepository.updateCity(isCityExist);

        return isCityExist;
    }
}
import { randomUUID } from "crypto";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { IEventRepository } from "../../domain/repositorys/IPlaceEvent";
import { eventDTO } from "../../infra/dto/eventSchemaDTO";
import { eventSchema } from "../../infra/schemas/eventSchema";
import { ServerError } from "../../infra/utils/serverError";
import { Events } from "../../domain/entities/event";

export class EventCreateUseCase {
    constructor(
        private eventRepository: IEventRepository,
        private cityRepository: ICityRepository
    ){}

    async execute(data: eventDTO, idCity: string){
        const parsedData = eventSchema.safeParse(data);
        if (!parsedData.data) throw new ServerError("Bad request");

        const {name, date, active, description, photoURL, instagram} = parsedData.data
        
        const isCityExist = await this.cityRepository.findUnique(idCity);
        if (!isCityExist) throw new ServerError("City not found", 404);

        const id = randomUUID();
        const event = new Events(name, date, active, description, photoURL, id, idCity, instagram);

        await this.eventRepository.createEvent(event);
        return event;
    }
}
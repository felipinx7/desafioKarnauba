import { EventCreateUseCase } from "../../../use-cases/event/eventCreateUseCase";
import { EventUpdateUseCase } from "../../../use-cases/event/eventUpdateUseCase";
import { EventDeleteUseCase } from "../../../use-cases/event/eventDeleteUseCase";
import { EventFindUniqueUseCase } from "../../../use-cases/event/eventFindUniqueUseCase";
import { EventFindAllUseCase } from "../../../use-cases/event/eventFindAllUseCase";
import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { Multipart } from "../plugins/multipart";

export class EventController {
    constructor(
        private multipart: Multipart,
        private createUseCase: EventCreateUseCase,
        private updateUseCase: EventUpdateUseCase,
        private deleteUseCase: EventDeleteUseCase,
        private findUniqueUseCase: EventFindUniqueUseCase,
        private findAllUseCase: EventFindAllUseCase
    ){}

    async create(fastify: FastifyContextDTO){
        const { idCity } = fastify.req.params as { idCity: string };
        const data = await this.multipart.handleDataMultipart(fastify.req, "event");

        const event = await this.createUseCase.execute(data, idCity);
        fastify.res.status(201).send({message: "Event created", ...event});
    }

    async update(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as { id: string };
        const data = await this.multipart.handleDataMultipart(fastify.req, "event");

        const updatedEvent = await this.updateUseCase.execute(data, id);
        fastify.res.send({message: "Updated Event", ...updatedEvent});
    }

    async delete(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as { id: string };
        await this.deleteUseCase.execute(id);
        fastify.res.send("Deleted event");
    }

    async findUnique(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as { id: string };
        const event = await this.findUniqueUseCase.execute(id);
        fastify.res.send({message: "Event found", ...event});
    }

    async findAll(fastify: FastifyContextDTO){
        const events = await this.findAllUseCase.execute();
        fastify.res.send(...events)
    }
}
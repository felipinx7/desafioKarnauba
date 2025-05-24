import { Category } from "@prisma/client";
import { PlaceCreateUseCase } from "../../../use-cases/place/placeCreateUseCase";
import { PlaceDeleteUseCase } from "../../../use-cases/place/placeDeleteUseCase";
import { PlaceFindAllUseCase } from "../../../use-cases/place/placeFindAllUseCase";
import { PlaceFindCategoryUseCase } from "../../../use-cases/place/placeFindCategoryUseCase";
import { PlaceFindUniqueUseCase } from "../../../use-cases/place/placefindUniqueUseCase";
import { PlaceUpdateUseCase } from "../../../use-cases/place/placeUpdateUseCase";
import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { Multipart } from "../plugins/multipart";

export class PlaceController {
    constructor(
       private multipart: Multipart,
       private createUseCase: PlaceCreateUseCase,
       private updateUseCase: PlaceUpdateUseCase,
       private deleteUseCase: PlaceDeleteUseCase,
       private findByCategoryUseCase: PlaceFindCategoryUseCase,
       private findUniqueUseCase: PlaceFindUniqueUseCase,
       private findAllUseCase: PlaceFindAllUseCase
    ){}

    async create(fastify: FastifyContextDTO){
        const { cityId } = fastify.req.params as { cityId: string }
        const data = await this.multipart.handleDataMultipart(fastify.req, "place");
        const place = await this.createUseCase.execute(data, cityId);
        fastify.res.status(201).send({message: "Place created", ...place});
    }

    async update(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as { id: string };
        const data = await this.multipart.handleDataMultipart(fastify.req, "place");
        const updatedPlace = await this.updateUseCase.execute(data, id);
        fastify.res.send({message: "Updated place", ...updatedPlace})
    }

    async delete(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as { id: string };
        await this.deleteUseCase.execute(id);
        fastify.res.send("Place deleted");
    }

    async findByCategory(fastify: FastifyContextDTO){
        const { category } = fastify.req.params as { category: Category };
        const placesByCategory = await this.findByCategoryUseCase.execute(category);
        fastify.res.send({message: `Places by category: ${category}`, ...placesByCategory});
    }

    async findUnique(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as { id: string };
        const place = await this.findUniqueUseCase.execute(id);
        fastify.res.send(place);
    }

    async findAll(fastify: FastifyContextDTO){
        const places = await this.findAllUseCase.execute();
        fastify.res.send(places)
    }
}
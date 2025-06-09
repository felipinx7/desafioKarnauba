import { TaxiDriverCreateUseCase } from "../../../use-cases/taxiDriver/taxiDriverCreateUseCase";
import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { Multipart } from "../plugins/multipart";

export class taxiDriverController {
    constructor( 
        private readonly taxiDriverCreateUseCase: TaxiDriverCreateUseCase,
        private readonly multipart: Multipart
    ) {}

    async create(fastify: FastifyContextDTO) {
        const { cityId } = fastify.req.params as { cityId: string }; 
        const data = await this.multipart.handleDataMultipart(fastify.req, "taxiDrivers");
        const taxiDriver = await this.taxiDriverCreateUseCase.execute(data, cityId);
        fastify.res.status(201).send({ message: "Taxi Driver created", ...taxiDriver });
    }
}
import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/authMiddleware";
import { taxiDriverInstance } from "../instances/taxiDriverInstance";


export function createTaxiDriver(fastify: FastifyInstance){
    fastify.post("/taxiDriver/register/:cityId", {preHandler: authMiddleware}, (req, res) => taxiDriverInstance.create({req, res}));
}


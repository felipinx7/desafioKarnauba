import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/authMiddleware";
import { taxiDriverInstance } from "../instances/taxiDriverInstance";


export function createTaxiDriver(fastify: FastifyInstance){
    fastify.post("/taxi-driver/register", {preHandler: authMiddleware}, (req, res) => taxiDriverInstance.create({req, res}));
}

export function findAllTaxiDrivers(fastify: FastifyInstance){
    fastify.get("/taxi-driver", {preHandler: authMiddleware}, (req, res) => taxiDriverInstance.findAll({req, res}));
}

export function findUniqueTaxiDriver(fastify: FastifyInstance){
    fastify.get("/taxi-driver/:id", {preHandler: authMiddleware}, (req, res) => taxiDriverInstance.findUnique({req, res}));
}

export function updateTaxiDriver(fastify: FastifyInstance){
    fastify.put("/taxi-driver/:id", {preHandler: authMiddleware}, (req, res) => taxiDriverInstance.update({req, res}));
}

export function deleteTaxiDriver(fastify: FastifyInstance){
    fastify.delete("/taxi-driver/:id", {preHandler: authMiddleware}, (req, res) => taxiDriverInstance.delete({req, res}));
}


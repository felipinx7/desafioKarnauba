import { FastifyInstance } from "fastify";
import { authGuard } from "../../utils/authGuard";
import { cityInstance } from "../instances/cityInstance";

export function cityRegister(fastify: FastifyInstance){
    fastify.post('/city/register', authGuard, (req, res) => cityInstance.createCity({req, res}))
}

export function cityUpdate(fastify: FastifyInstance){
    fastify.put('/city/update/:id', authGuard, (req, res) => cityInstance.updateCity({req, res}))
}

export function cityDelete(fastify: FastifyInstance){
    fastify.delete('/city/delete/:id', authGuard, (req, res) => cityInstance.deleteCity({req, res}))
}

export function cityFindUnique(fastify: FastifyInstance){
    fastify.get('/city/:id', (req, res) => cityInstance.findUniqueCity({req, res}))
}

export function cityFindMany(fastify: FastifyInstance){
    fastify.get('/citys', (req, res) => cityInstance.findAllCity({req, res}))
}

export function cityUpdatePhoto(fastify: FastifyInstance){
    fastify.put('/city/update/photo/:id', authGuard, (req, res) => cityInstance.updatePhoto({req, res}))
}

export function cityCreatePhoto(fastify: FastifyInstance){
    fastify.post('/city/create/photo/:cityId',authGuard, (req, res) => cityInstance.createPhoto({req, res}))
}
import { FastifyInstance } from "fastify";
import { placeInstance } from "../instances/placeInstance";
import { authGuard } from "../../utils/authGuard";


export function placeRegister(fastify: FastifyInstance){
    fastify.post('/place/register/:cityId', authGuard, (req, res) => placeInstance.create({req, res}));
}

export function placeUpdate(fastify: FastifyInstance){
    fastify.put('/place/update/:id', authGuard, (req, res) => placeInstance.update({req, res}));
}

export function placeDelete(fastify: FastifyInstance){
    fastify.delete('/place/delete/:id', authGuard, (req, res) => placeInstance.delete({req, res}));
}

export function placeByCategory(fastify: FastifyInstance){
    fastify.get('/places/:category', (req, res) => placeInstance.findByCategory({req, res}));
}

export function placeFindUnique(fastify: FastifyInstance){
    fastify.get('/place/:id', (req, res) => placeInstance.findUnique({req, res}));
}

export function placeFindAll(fastify: FastifyInstance){
    fastify.get('/places', (req, res) => placeInstance.findAll({req, res}));
}

export function placeUpdatePhoto(fastify: FastifyInstance){
    fastify.put('/place/photo/:id', authGuard, (req, res) => placeInstance.updatePhoto({req, res}))
}

export function placeCreatePhoto(fastify: FastifyInstance){
    fastify.post('/place/create/photo/:placeId',authGuard, (req, res) => placeInstance.createPhoto({req, res}))
}

export function placeDeletePhoto(fastify: FastifyInstance){
    fastify.delete('/place/delete/photo/:id', authGuard, (req, res) => placeInstance.deletePhoto({req,res}))
}
import { FastifyInstance } from "fastify";
import { eventInstance } from "../instances/eventInstance";
import { authGuard } from "../../utils/authGuard";

export function eventRegister(fastify: FastifyInstance){
    fastify.post('/event/register/:idCity', authGuard, (req, res) => eventInstance.create({req, res}));
}

export function updateEvent(fastify: FastifyInstance){
    fastify.put('/event/update/:id', authGuard, (req, res) => eventInstance.update({req, res}));
}

export function deleteEvent(fastify: FastifyInstance){
    fastify.delete('/event/delete/:id', authGuard, (req, res) => eventInstance.delete({req, res}));
}

export function findUniqueEvent(fastify: FastifyInstance){
    fastify.get('/event/:id', (req, res) => eventInstance.findUnique({req, res}));
}

export function findAllEvent(fastify: FastifyInstance){
    fastify.get('/events', (req, res) => eventInstance.findAll({req, res}));
}

export function findAvailableEvent(fastify: FastifyInstance){
    fastify.get('/events/available', (req, res) => eventInstance.findAvaliableEvent({req, res}))
}

export function UpdatePhotoEvent(fastify: FastifyInstance){
    fastify.put('/event/photo/:id', authGuard, (req, res) => eventInstance.updatePhoto({req, res}))
}

export function CreatePhotoEvent(fastify: FastifyInstance){
    fastify.post('/event/create/photo/:eventId', authGuard, (req, res) => eventInstance.createPhoto({req, res}))
}

export function DeletePhotoEvent(fastify: FastifyInstance){
    fastify.delete('/event/delete/photo/:id', authGuard, (req, res) => eventInstance.deletePhoto({req,res}))
}
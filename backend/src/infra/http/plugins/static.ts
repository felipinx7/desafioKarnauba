import { FastifyInstance } from "fastify";
import { join } from "path";
import fastifyStatic from "@fastify/static"

export async function staticFilesPlugin(fastify: FastifyInstance) {
    fastify.register(fastifyStatic, {
        root: join(__dirname, '..', '..', '..', 'uploads'),
        prefix: '/uplods/'
    })
}
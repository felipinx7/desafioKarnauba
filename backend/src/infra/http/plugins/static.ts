import { FastifyInstance } from "fastify";
import { join } from "path";
import fastifyStatic from "@fastify/static"
import { existsSync } from "fs";

export async function staticFilesPlugin(fastify: FastifyInstance) {
    try {
       const pathToUploads = join(__dirname, '..', '..', '..', '..', 'uploads');
        console.log("Static folder path:", pathToUploads);
        console.log('Path:', pathToUploads);
        console.log('Exists:', existsSync(pathToUploads));

        fastify.register(fastifyStatic, {
            root: pathToUploads,
            prefix: '/uploads/',
        });

        console.log("Static files plugin registered!");
    } catch (error) {
        console.error("Failed to register static files plugin:", error);
    }
}

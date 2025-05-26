import fastifyCookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import { env } from "../../config/env";
import fastifyRateLimit from "@fastify/rate-limit";
import { registerRoutes } from "./routes/registerRoutes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

const server = fastify();

server.register(fastifyCors, {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT']
})
server.register(fastifyRateLimit,{
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => {
        return req.ip
    },
    skipOnError: true,
})
server.register(fastifyCookie);
server.register(fastifyMultipart);
server.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Karnauba challenge API",
            description: "Karnauba challenge API documentation",
            version: '1.0.0'
        }
    }
});
server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full'
    }
});
server.register(registerRoutes);

server.listen({port: Number(env.PORT)}).then(() => {
    console.log("HTTP SERVER RUNNING!")
})
import fastifyCookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import { env } from "../../config/env";
import fastifyRateLimit from "@fastify/rate-limit";
import { registerRoutes } from "./routes/registerRoutes";

const server = fastify();

server.register(fastifyRateLimit,{
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => {
        return req.ip
    },
    skipOnError: true,
})
server.register(fastifyCookie)
server.register(fastifyMultipart)
server.register(registerRoutes)

server.listen({port: Number(env.PORT)}).then(() => {
    console.log("HTTP SERVER RUNNING!")
})
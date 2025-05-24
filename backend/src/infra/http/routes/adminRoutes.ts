import { FastifyInstance } from "fastify";
import { adminInstace } from "../instances/adminInstance";

export function adminRegister(fastify: FastifyInstance){
    fastify.post('/admin/register', (req, res) => adminInstace.create({req, res}));
}

export function adminLogin(fastify: FastifyInstance){
    fastify.post('/admin/login',{
        config: {
            rateLimit: {
                max: 5,
                timeWindow: 15 * 60 * 1000,
                errorResponseBuilder: () => {
                   return {
                    statusCode: 429,
                    message: "Too many requests, please try again later.",}
                }
            }
        }
    }, (req, res) => adminInstace.login({req, res}));
}

export function adminUpdate(fastify: FastifyInstance){
    fastify.put('/admin/update', (req, res) => adminInstace.update({req, res}));
}

export function adminDelete(fastify: FastifyInstance){
    fastify.delete('/admin/delete', (req, res) => adminInstace.delete({req, res}));
}

export function adminFindUnique(fastify: FastifyInstance){
    fastify.get('/admin/findUnique', (req, res) => adminInstace.findUnique({req, res}));
}
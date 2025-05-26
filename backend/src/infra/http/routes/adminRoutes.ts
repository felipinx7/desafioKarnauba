import { FastifyInstance } from "fastify";
import { adminInstace } from "../instances/adminInstance";
import { authGuard } from "../../utils/authGuard";
import zodToJsonSchema from "zod-to-json-schema";
import { adminLoginSchema, adminSchema } from "../../schemas/adminSchema";

export function adminRegister(fastify: FastifyInstance){
    fastify.post('/admin/register', {
        schema: {
            body: zodToJsonSchema(adminSchema, {name: 'Create Admin Body'}),
            summary: "Create admin",
            tags: ['Admin'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                    description: 'Admin created successfully'
                }
            },
            401: {
                type: 'object',
                 properties: {
                    message: { type: 'string' },
                },
                description: 'Invalid credentials'
            }
        }
    }, (req, res) => adminInstace.create({req, res}));
}

export function adminLogin(fastify: FastifyInstance){
    fastify.post('/admin/login', {
        config: {
            rateLimit: {
                max: 5,
                timeWindow: 15 * 60 * 1000,
                errorResponseBuilder: () => {
                   return {
                    statusCode: 429,
                    message: 'Too many requests, please try again later.'}
                }
            }
        },
        schema: {
            summary: "Admin Login",
            tags: ['Admin'],
            body: zodToJsonSchema(adminLoginSchema, {name: 'Admin Login Body' }),
            response: {
                200: {
                    type: "object",
                    properties: {
                        token: { type: 'string' }
                    }
                },
                401: {
                    type: "object",
                    properties: {
                        message: { type: 'string' }
                    },
                    description: 'Invalid credentials'
                },
                 429: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number' },
                        message: { type: 'string' }
                    },
                    description: 'Too many requests, please try again later.'
                }
            }
        }
    }, (req, res) => adminInstace.login({req, res}));
}

export function adminUpdate(fastify: FastifyInstance){
    fastify.put('/admin/update', authGuard, (req, res) => adminInstace.update({req, res}));
}

export function adminDelete(fastify: FastifyInstance){
    fastify.delete('/admin/delete', authGuard, (req, res) => adminInstace.delete({req, res}));
}

export function adminFindUnique(fastify: FastifyInstance){
    fastify.get('/admin', authGuard, (req, res) => adminInstace.findUnique({req, res}));
}

export function adminLogOut(fastify: FastifyInstance){
    fastify.delete('/admin/logout', authGuard, (req, res) => adminInstace.logout({req, res}))
}

export function adminCreateGoogle(fastify: FastifyInstance){
    fastify.post('/admin/register/google', (req, res) => adminInstace.createWithGoogle({req, res}))
}

export function adminLoginGoogle(fastify: FastifyInstance){
    fastify.post('/admin/login/google', {
        config: {
            rateLimit: {
                max: 5,
                timeWindow: 15 * 60 * 1000,
                errorResponseBuilder: () => ({
                    statusCode: 429,
                    message: "Too many requests, please try again later"
                })
            }
        }
    }, (req, res) => adminInstace.createWithGoogle({req, res}))
}
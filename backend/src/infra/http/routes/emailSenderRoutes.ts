import { FastifyInstance } from "fastify";
import { emailSenderInstance } from "../instances/emailSenderInstance";


export function emailSenderRoute(fastify: FastifyInstance){
    fastify.post('/admin/forgot-password', (req, res) => emailSenderInstance.senderEmail({req, res}))
}

export function codeResetPasswordRoute(fastify: FastifyInstance){
    fastify.post('/admin/code-reset-password', (req, res) => emailSenderInstance.codeReset({req, res}))
}


export function updatePasswordRoute(fastify: FastifyInstance){
    fastify.put('/patient/reset-password/:token', (req, res) => emailSenderInstance.resetPassword({req, res}))
}
import { FastifyInstance } from "fastify";
import { emailSenderInstance } from "../instances/emailSenderInstance";


export function emailSenderRoute(fastify: FastifyInstance) {
    fastify.post('/admin/forgot-password', {
        schema: {
            summary: 'Send email to reset password',
            description: 'This route sends an email to the user with a link to reset their password.',
            tags: ['Email'],
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string', format: 'email' }
                },
                required: ['email'],
                additionalProperties: false
            },
            responses: {
                200: {
                    description: 'Email sent successfully',
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Email sent successfully'] }
                    }
                },
                400: {
                    description: 'Bad Request',
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Invalid email format', 'Email is required'] }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Internal server error'] }
                    }
                }
            }
        }
    }, (req, res) => emailSenderInstance.senderEmail({ req, res }))
}

export function codeResetPasswordRoute(fastify: FastifyInstance) {
    fastify.post('/admin/code-reset-password', {
        schema: {
            summary: 'Send email with code to reset password',
            description: 'This route sends an email to the user with a code to reset their password.',
            tags: ['Email'],
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string', format: 'email' }
                },
                required: ['email'],
                additionalProperties: false
            },
            responses: {
                200: {
                    description: 'Email sent successfully',
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Email sent successfully'] },
                        code: { type: 'string', description: 'The code sent to the user' },
                        token: { type: 'string', description: 'The token for password reset' }
                    }
                },
                400: {
                    description: 'Bad Request',
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Invalid email format', 'Email is required'] }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Internal server error'] }
                    }
                }
            }
        }
    }, (req, res) => emailSenderInstance.codeReset({ req, res }))
}


export function updatePasswordRoute(fastify: FastifyInstance) {
    fastify.put('/patient/reset-password/:token', {
        schema: {
            summary: 'Reset password using token',
            description: 'This route allows a user to reset their password using a token sent to their email.',
            tags: ['Email'],
            params: {
                type: 'object',
                properties: {
                    token: { type: 'string', description: 'The token for password reset' }
                },
                required: ['token'],
                additionalProperties: false
            },
            body: {
                type: 'object',
                properties: {
                    password: { type: 'string', minLength: 8, description: 'New password' },
                    email: { type: 'string', format: 'email', description: 'Email of the user' }
                },
                required: ['password'],
                additionalProperties: false
            },
            responses: {
                200: {
                    description: 'Password reset successfully',
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Password reset successfully'] }
                    }
                },
                400: {
                    description: 'Bad Request',
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Invalid token', 'Password is required', 'Email is required'] }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Internal server error'] }
                    }
                }
            }
        }
    }, (req, res) => emailSenderInstance.resetPassword({ req, res }))
}
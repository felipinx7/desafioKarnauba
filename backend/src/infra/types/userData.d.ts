export interface userData { id: string }

declare module 'fastify' {
    interface FastifyRequest {
        user?: userData
    }
}

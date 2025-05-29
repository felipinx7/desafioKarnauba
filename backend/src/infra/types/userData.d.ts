export interface userData { id: string, cityId: string, remenberMe: boolean }

declare module 'fastify' {
    interface FastifyRequest {
        user?: userData 
    }
}

import { FastifyInstance } from "fastify";
import { adminDelete, adminFindUnique, adminLogin, adminRegister, adminUpdate } from "./adminRoutes";

const routes = [adminRegister, adminLogin, adminDelete, adminUpdate, adminFindUnique];
export const registerRoutes = (fastify: FastifyInstance) => {
    routes.forEach((routes) => {
        fastify.register(routes)
    })
};
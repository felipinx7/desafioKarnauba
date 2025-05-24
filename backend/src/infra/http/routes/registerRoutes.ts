import { FastifyInstance } from "fastify";
import { adminDelete, adminFindUnique, adminLogin, adminRegister, adminUpdate } from "./adminRoutes";
import { cityDelete, cityFindMany, cityFindUnique, cityRegister, cityUpdate } from "./cityRoutes";

const routes = [adminRegister, adminLogin, adminDelete, adminUpdate, adminFindUnique, cityDelete, cityFindMany, cityRegister, cityFindUnique, cityUpdate];
export const registerRoutes = (fastify: FastifyInstance) => {
    routes.forEach((routes) => {
        fastify.register(routes)
    })
};
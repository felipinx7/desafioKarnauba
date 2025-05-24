import { FastifyInstance } from "fastify";
import { adminDelete, adminFindUnique, adminLogin, adminLogOut, adminRegister, adminUpdate } from "./adminRoutes";
import { cityDelete, cityFindMany, cityFindUnique, cityRegister, cityUpdate } from "./cityRoutes";
import { placeByCategory, placeDelete, placeFindAll, placeFindUnique, placeRegister, placeUpdate } from "./placeRoutes";

const routes = [adminRegister, adminLogin, adminDelete, adminUpdate, adminFindUnique, adminLogOut, cityDelete, cityFindMany, cityRegister, cityFindUnique, cityUpdate, placeByCategory, placeDelete, placeFindAll, placeRegister, placeUpdate, placeFindUnique];

export const registerRoutes = (fastify: FastifyInstance) => {
    routes.forEach((routes) => {
        fastify.register(routes)
    })
};

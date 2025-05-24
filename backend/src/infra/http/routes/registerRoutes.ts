import { FastifyInstance } from "fastify";
import { adminDelete, adminFindUnique, adminLogin, adminLogOut, adminRegister, adminUpdate } from "./adminRoutes";
import { cityDelete, cityFindMany, cityFindUnique, cityRegister, cityUpdate } from "./cityRoutes";
import { placeByCategory, placeDelete, placeFindAll, placeFindUnique, placeRegister, placeUpdate } from "./placeRoutes";
import { deleteEvent, eventRegister, findAllEvent, findUniqueEvent, updateEvent } from "./eventRoutes";

const routes = [adminRegister, adminLogin, adminDelete, adminUpdate, adminFindUnique, adminLogOut, cityDelete, cityFindMany, cityRegister, cityFindUnique, cityUpdate, placeByCategory, placeDelete, placeFindAll, placeRegister, placeUpdate, placeFindUnique, eventRegister, updateEvent, deleteEvent, findAllEvent, findUniqueEvent];

export const registerRoutes = (fastify: FastifyInstance) => {
    routes.forEach((routes) => {
        fastify.register(routes)
    })
};

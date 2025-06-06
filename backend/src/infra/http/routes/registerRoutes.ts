import { FastifyInstance } from "fastify";
import { adminCreateGoogle, adminDelete, adminFindUnique, adminLogin, adminLoginGoogle, adminLogOut, adminRegister, adminUpdate } from "./adminRoutes";
import { cityCreatePhoto, cityDelete, cityDeletePhoto, cityFindMany, cityFindUnique, cityRegister, cityUpdate, cityUpdatePhoto } from "./cityRoutes";
import { placeByCategory, placeCreatePhoto, placeDelete, placeDeletePhoto, placeFindAll, placeFindUnique, placeRegister, placeUpdate, placeUpdatePhoto } from "./placeRoutes";
import { CreatePhotoEvent, deleteEvent, DeletePhotoEvent, eventRegister, findAllEvent, findAvailableEvent, findUniqueEvent, updateEvent, UpdatePhotoEvent } from "./eventRoutes";
import { codeResetPasswordRoute, emailSenderRoute, updatePasswordRoute } from "./emailSenderRoutes";

const routes = [adminRegister, adminLogin, adminDelete, adminUpdate, adminFindUnique, adminLogOut, adminCreateGoogle, adminLoginGoogle, emailSenderRoute, codeResetPasswordRoute, updatePasswordRoute, cityDelete, cityFindMany, cityRegister, cityFindUnique, cityUpdate, cityUpdatePhoto, cityCreatePhoto, cityDeletePhoto, placeByCategory, placeDelete, placeFindAll, placeRegister, placeUpdate, placeFindUnique, placeUpdatePhoto, placeCreatePhoto, placeDeletePhoto, eventRegister, updateEvent, deleteEvent, findAllEvent, findUniqueEvent, UpdatePhotoEvent, CreatePhotoEvent, DeletePhotoEvent, findAvailableEvent];


export const registerRoutes = (fastify: FastifyInstance) => {
    routes.forEach((routes) => {
        fastify.register(routes)
    })
};

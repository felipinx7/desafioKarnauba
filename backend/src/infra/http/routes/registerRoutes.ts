import { FastifyInstance } from "fastify";
import { adminCreateGoogle, adminDelete, adminFindUnique, adminLogin, adminLoginGoogle, adminLogOut, adminRegister, adminUpdate } from "./adminRoutes";
import { cityCreatePhoto, cityDelete, cityFindMany, cityFindUnique, cityRegister, cityUpdate, cityUpdatePhoto } from "./cityRoutes";
import { placeByCategory, placeCreatePhoto, placeDelete, placeFindAll, placeFindUnique, placeRegister, placeUpdate, placeUpdatePhoto } from "./placeRoutes";
import { CreatePhotoEvent, deleteEvent, eventRegister, findAllEvent, findUniqueEvent, updateEvent, UpdatePhotoEvent } from "./eventRoutes";
import { codeResetPasswordRoute, emailSenderRoute, updatePasswordRoute } from "./emailSenderRoutes";

const routes = [adminRegister, adminLogin, adminDelete, adminUpdate, adminFindUnique, adminLogOut, adminCreateGoogle, adminLoginGoogle, emailSenderRoute, codeResetPasswordRoute, updatePasswordRoute, cityDelete, cityFindMany, cityRegister, cityFindUnique, cityUpdate, cityUpdatePhoto, cityCreatePhoto, placeByCategory, placeDelete, placeFindAll, placeRegister, placeUpdate, placeFindUnique, placeUpdatePhoto, placeCreatePhoto, eventRegister, updateEvent, deleteEvent, findAllEvent, findUniqueEvent, UpdatePhotoEvent, CreatePhotoEvent];


export const registerRoutes = (fastify: FastifyInstance) => {
    routes.forEach((routes) => {
        fastify.register(routes)
    })
};

import { EventCreateUseCase } from "../../../use-cases/event/eventCreateUseCase";
import { EventDeleteUseCase } from "../../../use-cases/event/eventDeleteUseCase";
import { EventFindAllUseCase } from "../../../use-cases/event/eventFindAllUseCase";
import { EventFindUniqueUseCase } from "../../../use-cases/event/eventFindUniqueUseCase";
import { EventUpdateUseCase } from "../../../use-cases/event/eventUpdateUseCase";
import { IPrismaCityRepository } from "../../database/IPrismaCityRepository";
import { IPrismaEventRepository } from "../../database/IPrismaEventRepository";
import { PhotoStorageService } from "../../services/photoStorageService";
import { EventController } from "../controllers/eventController";
import { Multipart } from "../plugins/multipart";

const prismaEventRepository = new IPrismaEventRepository()
const prismaCityRepository = new IPrismaCityRepository();
const photoStorageService = new PhotoStorageService();
const eventCreateUseCase = new EventCreateUseCase(prismaEventRepository, prismaCityRepository);
const eventUpdateUseCase = new EventUpdateUseCase(prismaEventRepository, prismaCityRepository)
const eventDeleteUseCase = new EventDeleteUseCase(prismaEventRepository, prismaCityRepository);
const eventFindAllUseCase = new EventFindAllUseCase(prismaEventRepository);
const eventFindUniqueUseCase = new EventFindUniqueUseCase(prismaEventRepository, prismaCityRepository);
const multipart = new Multipart(photoStorageService);

export const eventInstance = new EventController(multipart, eventCreateUseCase, eventUpdateUseCase, eventDeleteUseCase, eventFindUniqueUseCase, eventFindAllUseCase)
import { PlaceCreatePhotoUseCase } from "../../../use-cases/place/placeCreatePhotoUseCase";
import { PlaceCreateUseCase } from "../../../use-cases/place/placeCreateUseCase";
import { PlaceDeleteUseCase } from "../../../use-cases/place/placeDeleteUseCase";
import { PlaceFindAllUseCase } from "../../../use-cases/place/placeFindAllUseCase";
import { PlaceFindCategoryUseCase } from "../../../use-cases/place/placeFindCategoryUseCase";
import { PlaceFindUniqueUseCase } from "../../../use-cases/place/placefindUniqueUseCase";
import { PlaceUpdatePhotoUseCase } from "../../../use-cases/place/placeUpdatePhotoUseCase";
import { PlaceUpdateUseCase } from "../../../use-cases/place/placeUpdateUseCase";
import { IPrismaCityRepository } from "../../database/IPrismaCityRepository";
import { IPrismaPlaceRepository } from "../../database/IPrismaPlaceRepository";
import { PhotoStorageService } from "../../services/photoStorageService";
import { PlaceController } from "../controllers/placeController";
import { Multipart } from "../plugins/multipart";

const prismaPlaceRepository = new IPrismaPlaceRepository();
const photoStorage = new PhotoStorageService();
const prismaCityRepository = new IPrismaCityRepository();
const multipart = new Multipart(photoStorage);
const createPlaceUseCase = new PlaceCreateUseCase(prismaPlaceRepository, prismaCityRepository);
const updatePlaceUseCase = new PlaceUpdateUseCase(prismaPlaceRepository, prismaCityRepository);
const deletePlaceUseCase = new PlaceDeleteUseCase(prismaPlaceRepository, prismaCityRepository);
const findByCategoryUseCase = new PlaceFindCategoryUseCase(prismaPlaceRepository);
const findUniqueUseCase = new PlaceFindUniqueUseCase(prismaPlaceRepository, prismaCityRepository);
const findAllUseCase = new PlaceFindAllUseCase(prismaPlaceRepository);
const updatePhotoUseCase = new PlaceUpdatePhotoUseCase(prismaPlaceRepository);
const createPhotoUseCase = new PlaceCreatePhotoUseCase(prismaPlaceRepository);


export const placeInstance = new PlaceController(multipart, createPlaceUseCase, updatePlaceUseCase, deletePlaceUseCase, findByCategoryUseCase, findUniqueUseCase, findAllUseCase, updatePhotoUseCase, createPhotoUseCase);
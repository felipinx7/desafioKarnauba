import { TaxiDriverCreateUseCase } from "../../../use-cases/taxiDriver/taxiDriverCreateUseCase";
import { IPrismaCityRepository } from "../../database/IPrismaCityRepository";
import { IPrismaTaxiDriverRepository } from "../../database/IPrismaTaxiDriverRepository";
import { PhotoStorageService } from "../../services/photoStorageService";
import { taxiDriverController } from "../controllers/taxiDriverController";
import { Multipart } from "../plugins/multipart";

const taxiDriverRepository = new IPrismaTaxiDriverRepository();
const photoStorage = new PhotoStorageService();
const cityRepository = new IPrismaCityRepository();
const multipart = new Multipart(photoStorage);

const taxiDriverCreateUseCase = new TaxiDriverCreateUseCase(taxiDriverRepository, cityRepository );

export const taxiDriverInstance = new taxiDriverController(
    taxiDriverCreateUseCase,
    multipart
);
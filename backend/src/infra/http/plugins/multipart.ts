import { FastifyRequest } from "fastify";
import { PhotoStorageService } from "../../services/photoStorageService";
import { PhotoStorageType } from "../../dto/photoStorageDTO";
import { ServerError } from "../../utils/serverError";

export class Multipart {
    constructor(private photoStorage: PhotoStorageService){};

    async handleDataMultipart(req: FastifyRequest, type: PhotoStorageType){
        const data = req.parts();
        let rawFields: any = {};
        let photoURL: string

        for await(const part of data){
            if(part.type === "file" && part.filename){
                const buffer = await part.toBuffer();
                const { filename, mimetype} = part;
                photoURL = await this.photoStorage.save({buffer, filename, mimetype}, type);
                rawFields[photoURL] = photoURL;
            } else if (part.type === "field"){
                rawFields[part.fieldname] = part.value;
            }
        }

        return rawFields;
    }
}
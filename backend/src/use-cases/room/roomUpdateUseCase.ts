import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { IRoomRepository } from "../../domain/repositorys/IRoomRepository";
import { RoomDTO } from "../../infra/dto/roomDTO";
import { roomSchema } from "../../infra/schemas/roomSchema";
import { ServerError } from "../../infra/utils/serverError";
import { updateDefineFields } from "../../infra/utils/updateDefinedFields";

export class RoomUpdateUseCase {
    constructor(
        private readonly roomRepository: IRoomRepository,
        private readonly placeRepository: IPlaceRepository
    ) {}

    async execute(data: RoomDTO, id: string){
        const parsedData = roomSchema.partial().safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad request");

        const { placeId } = parsedData.data;
        if (!placeId) throw new ServerError("Place ID is required");

        const isRoomExist = await this.roomRepository.findById(id);
        if (!isRoomExist) throw new ServerError("Room not found", 404);

        const isPlaceExist = await this.placeRepository.getPlaceById(placeId);
        if (!isPlaceExist) throw new ServerError("Place not found", 404);

        updateDefineFields(isRoomExist, parsedData.data);
        await this.roomRepository.updateRoom(isRoomExist);

        return isRoomExist;
    }
}
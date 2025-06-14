import { api } from "@/config/axios";
import type { roomData } from "@/dto/places/roomData";

export async function createRoom(data: roomData){
    try{
        const formData = new FormData();

        formData.append('price', data.price)
        formData.append('avaliable', data.avaliable)
        formData.append('description', data.description)

        data.photoURLs?.forEach((file) => {
            formData.append('photoURLs', file);
        })

        const response = await api.post('/room/register', formData)
        console.log("registred room:", response.data)
        return response.data;
    }
    catch (error) {
        console.error("Error creating room:", error);
        throw error;
    }
}
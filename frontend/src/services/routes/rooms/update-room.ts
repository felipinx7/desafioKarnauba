import { api } from "@/config/axios";
import type { roomData } from "@/dto/places/roomData";

export async function UpdateRoom(data: roomData){
    try{
        const formData = new FormData();

        formData.append('price', data.price)
        formData.append('avaliable', data.avaliable)
        formData.append('description', data.description)

        data.photoURLs?.forEach((file) => {
            formData.append('photoURLs', file);
        })

        const response = await api.put(`/room/update/${data.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },  
        })
        console.log("updated room:", response.data)
        return response.data;
    }
    catch (error) {
        console.error("Error updating room:", error);
        throw error;
    }
}
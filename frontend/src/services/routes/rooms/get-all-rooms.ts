import { api } from "@/config/axios";
import type { roomData } from "@/dto/places/roomData";

export async function getAllRooms(placeId: string) {
    try {
        const response = await api.get<roomData[]>(`/room/get-all-rooms/${placeId}`);
        console.log("All rooms:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all rooms:", error);
        throw error;
    }
}
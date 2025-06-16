import { api } from "@/config/axios";
import type { roomData } from "@/dto/places/roomData";

export async function getAllRooms() {
    try {
        const response = await api.get<roomData[]>(`rooms/available`);
        console.log("All rooms:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all rooms:", error);
        throw error;
    }
}
import { api } from "@/config/axios"

export const getPLaces = async (id: string) => {
    try {
        const response = await api.get(`/place/${id}`)
        return response

    } catch (error) {
        console.log("Falha ao pegar", error)
    }
}
import { api } from "@/config/axios"

export const GetEventCity = async () => {
    try {
        const { data } = await api.get('/events')
        const events = data
        console.log("Eventos da Cidade", events)
        return events
    } catch (error) {
        console.log("O erro foi de:", error)
    }
}
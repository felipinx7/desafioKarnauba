import { api } from "@/config/axios"

export const DeleteEvent = async (id: string) => {
  try {
    const { data } = await api.delete(`/event/delete/${id}`)
    const event = data
    console.log("Excluido com sucesso!", event)
  } catch (error) {
    console.log("Falha ao exlcuir", error);
    
  }
}

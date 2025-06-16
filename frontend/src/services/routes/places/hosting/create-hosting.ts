import { api } from "@/config/axios"
import type { HostingDTO } from "@/dto/places/data-places-DTO"

export async function createHostingWithRoom(data: Omit<HostingDTO, "id" | "cityID">) {
  try {
   const formData = new FormData()

    formData.append('name', data.name)
    if (data.phone) formData.append('phone', data.phone)
    if (data.instagram) formData.append('instagram', data.instagram)
    formData.append('location', data.location)
    formData.append('description', data.description)
    formData.append('category', "HOSTING")

    // add file photo
    data.photoURLs.forEach((file) => {
      formData.append('photoURLs', file)
    })

    // Submite formData
    const response = await api.post('/place/register', formData)

    const placeID = response.data.id  
    console.log("Hosting criado:", response.data)

    const roomFormData = new FormData()
    roomFormData.append("price", String(data.room.price))
    roomFormData.append("available", String(true))
    roomFormData.append("placeId", placeID) 

  

    const roomResponse = await api.post(`/room/register/${placeID}`, roomFormData)
    console.log("Quarto criado:", roomResponse.data)

    return {
      place: response.data,
      room: roomResponse.data,
    }
  } catch (error) {
    console.error("Erro ao criar hosting e room:", error)
    throw error
  }
}

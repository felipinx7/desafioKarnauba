import { api } from '@/config/axios'
import { DeleteRoom } from '../../rooms/delete-room'

export const DeleteHosting = async (id: string) => {
  try {
    const res = await api.get(`/place/${id}`)

    const roomId = res.data.rooms[0].id
    await DeleteRoom(roomId)
    
    const { data } = await api.delete(`/place/delete/${id}`)
    console.log('Dados da API', data)
    return data
  } catch (error) {
    console.log(error)
  }
}

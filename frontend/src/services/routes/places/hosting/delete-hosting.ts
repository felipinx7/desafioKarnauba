import { api } from '@/config/axios'
import { DeleteRoom } from '../../rooms/delete-room'

export const DeleteHosting = async (id: string) => {
  try {

    DeleteRoom()
    
    const { data } = await api.delete(`/place/delete/${id}`)
    const place = data
    console.log('Dados da API', data)
    return data
    return data
  } catch (error) {
    console.log(error)
  }
}

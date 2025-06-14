import { api } from '@/config/axios'

export const DeleteRoom = async (id: string) => {
  try {
    const { data } = await api.delete(`/room/delete/${id}`)
    console.log('Sala deletada', data)
    return data
  } catch (error) {
    console.log(error)
  }
}

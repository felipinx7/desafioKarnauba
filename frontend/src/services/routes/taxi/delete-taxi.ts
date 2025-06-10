import { api } from '@/config/axios'

export const deleteTaxi = async (id: string) => {
  try {
    const response = await api.delete(`/taxi-driver/${id}`)
    console.log('Sucesso ao excluir Taxista', response)
    return response
  } catch (error) {
    console.log('Falha ao deletar taxista', error)
  }
}

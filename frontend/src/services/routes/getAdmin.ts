import { api } from '@/config/axios'
import { AdminDTO } from '@/dto/adminDTO'

export const getAdmin = async (): Promise<AdminDTO | null> => {
  try {
    const { data } = await api.get('/admin')
    const { admin } = data
    console.log(admin.name)
    return admin
  } catch (error) {
    console.error('Erro ao buscar admin:', error)
    return null
  }
}

import { api } from '@/config/axios'
import { DataLoginUser } from '@/dto/admin/data-login-admin-DTO'

export async function LoginUser(data: DataLoginUser) {
  try {
    const response = await api.post('/admin/login', data)
    console.log('Resposta da API:', response.data)
    return response.data
  } catch (error) {
    console.error('Erro ao logar no sistema:', error)
    throw error
  }
}

import { api } from '@/config/axios'

export const CreateTaxi = async (data: FormData) => {
  try {
    const response = await api.post('/taxi-driver/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('Taxista Criado com sucesso!', response)
    return response
  } catch (error) {
    console.log('Erro ao criar Taxista', error)
  }
}

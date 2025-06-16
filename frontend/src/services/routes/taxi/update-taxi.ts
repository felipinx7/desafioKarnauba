import { api } from '@/config/axios'
import { UpdateTaxiFormData } from '@/paginas/administrative/components/layouts/card-taxi'

export const updateTaxi = async (id: string, data: UpdateTaxiFormData) => {
  try {
    const response = await api.put(`/taxi-driver/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (error) {
    console.log('Falha ao Atualizar o Taxista', error)
  }
}

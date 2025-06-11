import { api } from '@/config/axios'

export const getInfoCity = async () => {
  try {
    const { data } = await api.get('/city')
    const city = data
    console.log('Informações da Cidade:', city)
    return city
  } catch (error) {
    console.log('Error', error)
  }
}

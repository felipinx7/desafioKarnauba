import { api } from '@/config/axios'

export const getInfoCity = async () => {
  try {
    const { data } = await api.get('/city')
    const { city } = data
    return data
} catch (error) {
    console.log("o erro foi: ",error)
}
}

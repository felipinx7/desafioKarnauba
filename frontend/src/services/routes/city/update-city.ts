import { api } from "@/config/axios"

export const updateCity = async (data: FormData) => {
  const response = await api.put('/city/update', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

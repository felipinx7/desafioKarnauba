import { api } from '@/config/axios'
import { DataPlaces } from '@/dto/places/data-create-places-DTO'

export const createPlace = async (data: DataPlaces) => {
  try {
    const formData = new FormData()

    formData.append('name', data.name)
    if (data.phone) formData.append('phone', data.phone)
    if (data.instagram) formData.append('instagram', data.instagram)
    formData.append('location', data.location)
    formData.append('description', data.description)
    formData.append('category', data.category)

    // add file photo
    data.photoURLs.forEach((file) => {
      formData.append('photoURLs', file)
    })

    // Submite formData
    const response = await api.post('/place/register', formData)

    console.log('location:', data.location)
    return response
  } catch (error) {
    console.log('error ao criar um local:', error)
    throw error
  }
}

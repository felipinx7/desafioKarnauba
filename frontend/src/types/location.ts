import { dataPlaceDTO } from '@/dto/places/data-places-DTO'
import { StaticImageData } from 'next/image'

export interface BaseLocation {
  id: string
  name: string
  description: string
  image: StaticImageData
  cityId: string
  instagram?: string
}

export interface Event extends BaseLocation {
  date: Date
  lastDate: Date
  active: boolean
  instagram: string
}

export interface Place extends BaseLocation {
  photos: StaticImageData
  city: dataPlaceDTO
  categories: string[]
}

export type LocationType = Event | Place

import { z } from 'zod'
import { roomSchema } from './room-schema'

export const placeSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).regex(/^[^<>]*$/, 'Sem tags HTML'),
  phone: z
    .string()
    .max(15)
    .regex(/^[^<>]*$/, 'Sem tags HTML')
    .optional(),
  instagram: z
    .string()
    .regex(/^[^<>]*$/, 'Sem tags HTML')
    .optional(),
  location: z.string({ required_error: 'Location is required' }).regex(/^[^<>]*$/, 'Sem tags HTML'),
  description: z
    .string({ required_error: 'Description is required' })
    .regex(/^[^<>]*$/, 'Sem tags HTML'),
  photoURLs: z.array(z.instanceof(File)),

  category: z.enum(['RESTAURANT', 'HOTEL', 'TOURIST_ATTRACTIONS', 'LANDSCAPE', "HOSTING"]),
})

export type eventSchema = z.infer<typeof placeSchema>







export const dataHostingSchema = z.object({
  name: z
    .string({ required_error: 'O campo "name" é obrigatório.' })
    .regex(/^[^<>]*$/, 'Sem tags HTML'),

  phone: z
    .string()
    .max(15, 'Máximo de 15 caracteres')
    .regex(/^[^<>]*$/, 'Sem tags HTML')
    .optional(),

  instagram: z
    .string()
    .regex(/^[^<>]*$/, 'Sem tags HTML')
    .optional(),

  location: z
    .string({ required_error: 'O campo "location" é obrigatório.' })
    .regex(/^[^<>]*$/, 'Sem tags HTML'),

  description: z
    .string({ required_error: 'O campo "description" é obrigatório.' })
    .regex(/^[^<>]*$/, 'Sem tags HTML'),

  photoURLs: z
    .array(z.instanceof(File), { required_error: 'Pelo menos uma foto é obrigatória.' })
    ,

  room: roomSchema,
})
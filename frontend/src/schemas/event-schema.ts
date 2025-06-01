import { z } from 'zod'

export const eventSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  date: z.string(),
  lastDate: z.string(),
  location: z.string().min(1, 'Localização é obrigatória'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  active: z.string().min(1, 'Status é obrigatório'),
  photoURLs: z.array(z.instanceof(File)).min(1, 'Envie ao menos uma foto'),
  instagram: z.string().optional(),
})



export type EventFormData = z.infer<typeof eventSchema>

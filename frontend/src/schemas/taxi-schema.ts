import { z } from 'zod'

export const taxiSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  phone: z.string().min(1, 'Telefone obrigatório'),
  workingDescription: z.string().min(1, 'Descrição obrigatória'),
  photoURLs: z
    .instanceof(File)
    .optional()
    .refine((file) => file === undefined || file.size > 0, 'Arquivo inválido'),
})

export type dataTaxi = z.infer<typeof taxiSchema>

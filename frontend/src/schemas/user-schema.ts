import { z } from 'zod'

export const loginUserSchema = z.object({
  email: z.string().email('Email Inválido'),
  password: z.string().min(8, 'Senha dever no minimo 8 caracteres'),
})

export type loginUser = z.infer<typeof loginUserSchema>
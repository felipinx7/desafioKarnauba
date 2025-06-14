import { z } from "zod";

export const roomSchema = z.object({
  price: z
    .number({ required_error: "O preço é obrigatório." })
    .positive("O preço deve ser um número positivo."),
    
available: z
  .boolean({ required_error: "Disponibilidade é obrigatória." })
  .default(true)
  .optional(),


  photoURLs: z
    .array(z.instanceof(File, { message: "Cada arquivo deve ser um File válido." }))
    .min(1, "Pelo menos uma URL de foto é obrigatória."),

  description: z
    .string({ required_error: "A descrição é obrigatória." })
    .min(1, "A descrição não pode estar vazia."),

  

})
/*
model Room {
  id          String   @id
  price       Float
  available   Boolean @default(true)
  placeId     String
  place       Place    @relation(fields: [placeId], references: [id])
} */
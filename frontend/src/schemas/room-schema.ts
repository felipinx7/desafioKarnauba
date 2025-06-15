import { z } from "zod";

export const roomSchema = z.object({
  price: z
    .number({ required_error: "O preço é obrigatório." })
    .positive("O preço deve ser um número positivo."),
    
available: z
  .boolean({ required_error: "Disponibilidade é obrigatória." })
  .default(true)
  .optional(),

  

})
/*
model Room {
  id          String   @id
  price       Float
  available   Boolean @default(true)
  placeId     String
  place       Place    @relation(fields: [placeId], references: [id])
} */
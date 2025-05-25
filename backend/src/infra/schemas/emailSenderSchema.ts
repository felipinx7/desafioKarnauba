import { z } from "zod";

export const emailSenderSchema = z.object({
    email: z.string().email(),
    ip: z.string().ip()
})

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
    token: z.string(),
    password: z.string()
})

export const codeResetSchema = z.object({
    email: z.string().email(),
    code: z.string()
})
import { z } from "zod"

export const UserFormValidation = z.object({
    name: z.string()
    .min(2,  "Username must be at least 2 characters.")
    .max(30, "username should be at most30 characters"),
    email:z.string().email("Invalid email address"),
    phone:z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid Phone Number')
    })
  
  
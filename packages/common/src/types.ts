import * as z from "zod"
export const CreateUserSchema = z.object({
  email: z.email(),
  password: z.string().min(5).max(50),
  name: z.string().min(3).max(50),
  photo: z.string().optional()

})

export const SigninSchema = z.object({
  email: z.email(),
  password: z.string().min(5).max(50),
})

export const CreateRoomSchema = z.object({
  name: z.string()
})

import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(3)
  .max(30)
  .regex(/^[a-zA-Z0-9._]+$/, "Invalid username");

export const signUpSchema = z.object({
  username: usernameSchema,

  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

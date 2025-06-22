import { z } from "zod";
import {
  MOBILE_PHONE_MASK,
  PASSWORD_MASK,
  PASSWORD_VALIDATION_MSG,
  USERNAME_MASK,
} from "./constants";

const email = z
  .union([
    z
      .string()
      .trim()
      .max(512, "Email deve possuir no máximo 512 caracteres")
      .email("E-mail inválido"),
    z.literal(""),
  ])
  .optional();

const mobilePhone = z
  .union([
    z.string().trim().regex(MOBILE_PHONE_MASK, "Número de celular inválido"),
    z.literal(""),
  ])
  .optional();

const password = z
  .string()
  .trim()
  .regex(PASSWORD_MASK, PASSWORD_VALIDATION_MSG);

export const createCommonUserSchema = z
  .object({
    email,
    mobilePhone,
    password,
    confirmPassword: z
      .string()
      .trim()
      .regex(PASSWORD_MASK, PASSWORD_VALIDATION_MSG),
    username: z
      .string()
      .trim()
      .max(30, "O nome deve ter no máximo 30 caracteres")
      .regex(
        USERNAME_MASK,
        "É permitido somente letras e números no nome de usuário"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email,
  mobilePhone,
  password,
});

export const recoverPassSchema = z.object({
  email,
  mobilePhone,
});

export const adminLoginSchemaShape = z.object({
  email,
  password,
});

export const adminLoginSchema = adminLoginSchemaShape.required();

export type CreateCommonUserSchema = z.infer<typeof createCommonUserSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RecoverPassSchema = z.infer<typeof recoverPassSchema>;
export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;

import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginBody = z.infer<typeof LoginSchema>;
export class LoginDto extends createZodDto(LoginSchema) {}

export const RefreshSchema = z.object({
  refresh: z.string(),
});
export type RefreshBody = z.infer<typeof RefreshSchema>;
export class RefreshDto extends createZodDto(RefreshSchema) {}

export const TokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  email: z.string().email(),
});
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export class TokenResponseDto extends createZodDto(TokenResponseSchema) {}

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type RegisterBody = z.infer<typeof RegisterSchema>;
export class RegisterDto extends createZodDto(RegisterSchema) {}

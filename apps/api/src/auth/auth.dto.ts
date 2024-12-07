import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class RegisterDto extends createZodDto(UserSchema) {}
export class UserResponse extends createZodDto(
  z.object({
    id: z.number(),
    email: z.string(),
    name: z.string().nullable(),
  }),
) {}

export class LoginDto extends createZodDto(UserSchema) {}
export class LoginResponse extends createZodDto(
  z.object({
    email: z.string(),
    name: z.string().nullable(),
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
) {}

export class RefreshDto extends createZodDto(
  z.object({
    refresh: z.string(),
  }),
) {}
export class RefreshResponse extends createZodDto(
  z.object({
    email: z.string(),
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
) {}

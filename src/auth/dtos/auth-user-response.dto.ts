import { User } from '@prisma/client';

export type AuthUserResponseDto = Omit<User, 'password'>;

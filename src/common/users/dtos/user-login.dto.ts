import { Prisma } from '@prisma/client';

export type UserLogin = Pick<Prisma.UserCreateInput, 'email' | 'password'>;

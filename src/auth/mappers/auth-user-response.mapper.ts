import { User } from '@prisma/client';
import { AuthUserResponseDto } from '../dtos';

export abstract class AuthUserResponseMapper {
  static map(user: User): AuthUserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

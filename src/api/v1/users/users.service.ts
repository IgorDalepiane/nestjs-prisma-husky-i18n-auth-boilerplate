import { Injectable } from '@nestjs/common/decorators/core';
import { Prisma, User } from '@prisma/client';
import { hashPassword } from '@common/utils';
import { PrismaService } from '@common/prisma/prisma.service';
import { AuthUserResponseMapper } from '@src/common/auth/mappers';
import { AuthUserResponseDto } from '@src/common/auth/dtos';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  }

  async findLoggedUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<AuthUserResponseDto | null> {
    const user = await this.prisma.user.findUnique({ where: userWhereUniqueInput });

    if (!user) {
      return null;
    }
    return AuthUserResponseMapper.map(user);
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await hashPassword(data.password);

    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  // TODO: add update password
}

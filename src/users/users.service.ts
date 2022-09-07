import { Injectable } from '@nestjs/common/decorators/core';

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Igor',
      username: 'igor',
      password: '1234',
    },
    {
      id: 2,
      name: 'Lucas',
      username: 'lucas',
      password: '1234',
    },
  ];

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}

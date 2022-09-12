import { comparePassword, hashPassword } from './bcrypt.utils';

it('should hash and compare password correctly', async () => {
  const password = 'abc';
  const hashedPassword = await hashPassword(password);

  expect(await comparePassword(password, hashedPassword));
});

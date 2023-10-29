import { hash } from 'bcryptjs';
import { prisma } from './database.server';

type signupProps = {
  email: string;
  password: string;
};

export async function signup({ email, password }: signupProps) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error('User with the provided email already exists');
    error.status = 422;
    throw error;
  }

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({ data: { email, password: hashedPassword } });
}
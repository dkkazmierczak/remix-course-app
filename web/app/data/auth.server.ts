import { hash, compare } from 'bcryptjs';
import { prisma } from './database.server';
import { createCookieSessionStorage } from '@remix-run/node';

const SESSION_SECRET = process.env.SESSION_SECRET!;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

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

export async function login({ email, password }: signupProps) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error = new Error('User with the provided email does not exist');
    error.status = 401;
    throw error;
  }
  const passwordCorrect = await compare(password, existingUser.password);
  if (!passwordCorrect) {
    const error = new Error('Incorrect password');
    error.status = 401;
    throw error;
  }
}

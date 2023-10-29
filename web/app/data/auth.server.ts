import { hash, compare } from 'bcryptjs';
import { prisma } from './database.server';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

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

async function createUserSession(userId: number, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);

  const cookie = await sessionStorage.commitSession(session);

  //something wrong with this. It doesnt redirect
  return redirect(redirectPath, {
    status: 303,
    headers: {
      'Set-Cookie': cookie,
    },
  });
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  const userId = session.has('userId');

  if (!userId) return null;

  return userId;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

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

  const user = await prisma.user.create({ data: { email, password: hashedPassword } });
  return createUserSession(+user.id, '/expenses');
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
  return createUserSession(+existingUser.id, '/expenses');
}

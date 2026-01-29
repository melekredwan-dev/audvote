'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export type AuthState = {
  error?: string;
  success?: boolean;
};

export async function register(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const username = formData.get('username') as string;

  if (!name || !email || !password || !username) return { error: 'All fields are required' };
  if (password.length < 8) return { error: 'Password must be at least 8 characters' };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (existingUser) return { error: 'Email already in use' };

  const existingUsername = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  if (existingUsername) return { error: 'Username already taken' };

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    username,
  });

  return { success: true };
}

export async function login(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) return { error: 'Email and password are required' };

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error;
  }
}

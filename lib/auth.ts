'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

// Simple user storage (in production, this would be a database)
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'password', // In production, this should be hashed
    name: 'Admin User',
  },
];

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Find user
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return { error: 'Invalid email or password' };
  }

  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set('session', JSON.stringify({
    id: user.id,
    email: user.email,
    name: user.name,
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  redirect('/meetings');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/');
}

export const getSession = cache(async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  
  if (!sessionCookie) {
    return null;
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    return session;
  } catch {
    return null;
  }
});

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}
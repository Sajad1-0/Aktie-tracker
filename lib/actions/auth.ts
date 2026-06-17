'use server';

import type { User } from '../../generated/prisma/client';
import prisma from '../prisma';
import createServerClient from '../server';
import { redirect } from 'next/navigation';

export interface ActionResult<T> {
  data: T | null;
  error: string | null;
}

interface CreateProfileInput {
  id: string;
  email: string;
  name?: string;
  imageUrl?: string;
}

const createUserProfile = async ({
  id,
  email,
  name,
  imageUrl,
}: CreateProfileInput): Promise<ActionResult<User>> => {
  try {
    const existingByEmail = await prisma.user.findUnique({
      where: { email },
      include: { watchlists: true },
    });

    if (existingByEmail && existingByEmail.id !== id) {
      if (existingByEmail.watchlists.length > 0) {
        return {
          data: null,
          error: 'This email is already registered. Please sign in instead.',
        };
      }

      await prisma.user.delete({
        where: { id: existingByEmail.id },
      });
    }

    const user = await prisma.user.upsert({
      where: { id },
      update: { email, name, imageUrl },
      create: { id, email, name, imageUrl },
    });

    return { data: user, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: 'Failed to create user profile' };
  }
};

export default createUserProfile;

export const signOut = async (): Promise<{ error: string | null }> => {
  const supabase = await createServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return { error: 'Failed to sign out' };
  }

  redirect('/signIn');
};

export const getAuthenticatedUser = async () => {
  const supabase = await createServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/signIn');
  }

  return user;
};

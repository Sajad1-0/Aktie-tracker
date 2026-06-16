'use server';

import prisma from '../prisma';
import createServerClient from '../server';
import { redirect } from 'next/navigation';

interface CreateProfileInput {
  id: string;
  email: string;
  name?: string;
  imageUrl?: string;
}

const createUserProfile = async ({ id, email, name, imageUrl }: CreateProfileInput) => {
  try {
    const existingByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingByEmail && existingByEmail.id !== id) {
      throw new Error('This email is already registered. Please sign in instead.');
    }

    const user = await prisma.user.upsert({
      where: { id },
      update: { email, name, imageUrl },
      create: { id, email, name, imageUrl },
    });

    return user;
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Failed to create user profile');
  }
};

export default createUserProfile;

export const signOut = async () => {
  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to sign out');
  }

  redirect('/signIn');
};

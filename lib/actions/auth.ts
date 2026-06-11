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
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await prisma.user.upsert({
      where: { id },
      update: { email, name, imageUrl },
      create: { id, email, name, imageUrl },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user profile');
  }
};

export default createUserProfile;

export const signOut = async () => {
  try {
    const supabase = await createServerClient();
    await supabase.auth.signOut();
    redirect('/signIn');
    return { success: true, message: 'Signed out successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to sign out' };
  }
};

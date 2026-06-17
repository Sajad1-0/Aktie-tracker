import { type NextRequest, NextResponse } from 'next/server';
import updateSession from '@/lib/auth-middleware';

const publicRoutes = ['/signIn', '/signUp', '/auth/callback'];

export const middleware = async (request: NextRequest) => {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signIn', request.url));
  }

  if (user && (pathname === '/signIn' || pathname === '/signUp')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return supabaseResponse;
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};

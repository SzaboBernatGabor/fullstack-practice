import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { deleteCookie, getCookie } from './components/auth/cookieManager';

interface CookieData {
  permission: number;
  active: boolean;
}

export async function middleware(request: NextRequest) {
  try {
    const token = (await getCookie('token')) as any;
    console.log(request.nextUrl.pathname)
    if (token) {
      const decoded = jwt.decode(token?.value) as any;
      if (decoded.active) {
        const cookieData: CookieData = {
          permission: decoded.permission,
          active: decoded.active,
        };
      }
      if (request.nextUrl.pathname.startsWith('/admin') && decoded.permission !== 2)
      {
        return NextResponse.redirect(new URL('/cats', request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } catch (error: any) {
    console.log('Invalid token! Please try again!');
    deleteCookie('token');
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/cats', '/admin']
};

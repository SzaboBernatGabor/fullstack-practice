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
    if (token) {
      const decoded = jwt.decode(token?.value) as any;
      if (decoded.active) {
        const cookieData: CookieData = {
          permission: decoded.permission,
          active: decoded.active,
        };
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

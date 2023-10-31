import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

const protectedRoutes = ['/profile'];
const privateRoutes = ['/login', '/register']

export default function middleware (req: NextRequest) {
    const cookieStore = cookies()
    const token = cookieStore.get('JWT_token');

    console.log(token);

    if(!token && protectedRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if(token && privateRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/profile', req.url));
    }

}

export const config = {
    matcher: ['/profile', '/login', '/register']
  }
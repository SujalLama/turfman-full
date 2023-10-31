import { serialize } from "cookie";
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24;

export async function POST(request: Request) {
    const body = await request.json();

    const {token} = body;

    if(!token) {
      return NextResponse.json({message: 'Please provide token!'}, {status: 401});
    }
    
    const serialized = serialize("JWT_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: '/'
    });

  return new Response(JSON.stringify({message: 'Authenticated!'}), {
    status: 200,
    headers: { 'Set-Cookie': serialized },
  })
}

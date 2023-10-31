import { serialize } from "cookie";

export async function POST() {
    try{
        const serialized = serialize("JWT_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
            path: '/'
          });
      
        return new Response(JSON.stringify({message: 'Logout!'}), {
          status: 200,
          headers: { 'Set-Cookie': serialized },
        })
    } catch(error) {
        return new Response(JSON.stringify({message: 'server error'}),{status: 500})
    }
  }
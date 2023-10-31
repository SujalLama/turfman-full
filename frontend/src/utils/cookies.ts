"use client";

export const setTokenCookie = async (token: string) => {
  const data = await fetch("/api/auth/login", {
     method: "post",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ token }),
   });

   return data;
};

export const removeTokenCookie = async () => {
  const data = await fetch("/api/auth/logout", {
     method: "post",
     headers: {
       "Content-Type": "application/json",
     },
   });

   return data;
};

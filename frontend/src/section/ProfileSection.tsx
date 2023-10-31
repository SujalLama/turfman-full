"use client";

import { removeTokenCookie } from "@/utils/cookies";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function ProfileSection() {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<{username: string; email: string; phone: string;} | null>(null);

    const {replace} = useRouter();

    useLayoutEffect(() => {
        getProfileDetail();
    }, [])

    async function getProfileDetail() {
        try {
            setLoading(true);
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me?populate[0]=profile_img`, {withCredentials: true})

            const profileData = {
                username: data.username,
                email: data.email,
                phone: data.phone,
            }
            setProfile(profileData);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setProfile(null);
        }
    }

    if(!profile || loading) {
        return <div>Not available.</div>
    }

    async function logOut () {
       const data = await removeTokenCookie()

       if(data.status == 200) {
        replace('/login')
       }
    }

  return (
    <div className="">
        <h1>
            {profile.username}
        </h1>
        <h1>
            {profile.email}
        </h1>
        <h1>
            {profile.phone}
        </h1>
        <button onClick={logOut}>Log Out</button>
    </div>

  )
}

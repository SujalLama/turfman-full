"use client";

import { UserContext, UserTypes, localStoreUserKey } from "@/providers/AuthProvider";
import { removeTokenCookie } from "@/utils/cookies";
import { removeFromStore } from "@/utils/localStorage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useLayoutEffect, useState } from "react";

export default function ProfileSection() {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<{username: string; email: string; phone: string;} | null>(null);
    const {dispatch} = useContext(UserContext);
    const {replace} = useRouter();

    useLayoutEffect(() => {
        getProfileDetail();
    }, [])

    function logOut () {
        dispatch({type: UserTypes.RemoveUser});
         replace('/login')
     }

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
        return <>
        <div>Not available.</div>
        <button onClick={logOut}>Log Out</button>
        </>
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

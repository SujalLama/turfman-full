"use client";

import { UserContext, UserTypes, localStoreUserKey } from "@/providers/AuthProvider";
import { removeTokenCookie } from "@/utils/cookies";
import { removeFromStore } from "@/utils/localStorage";
import axios from "axios";
import Link from "next/link";
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
            const {data:{data}} = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me?populate[0]=profile_img`, {withCredentials: true})

            const profileData = {
                username: data.username,
                email: data.email,
                phone: data.phone,
            }

            console.log(data);
            setProfile(profileData);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setProfile(null);
        }
    }

    // if(!profile || loading) {
    //     return <>
    //     <div>Not available.</div>
    //     <button onClick={logOut}>Log Out</button>
    //     </>
    // }

  return (    
    <div className="my-8 flex gap-2">

        <ul className="text-left cla">
            <li >
                <Link  className="px-12 py-2 block bg-gray-100 mb-1 border-l-primary hover:bg-gray-400 hover:text-white border-l-4" href="/profile">Profile</Link>
            </li>
            <li>
                <Link  className="px-12 py-2 block bg-gray-100 mb-1 border-l-primary hover:bg-gray-400 hover:text-white border-l-4" href="/orders">Orders</Link>
            </li>
            <li >
            <Link  className="px-12 py-2 block bg-gray-100 mb-1 border-l-primary hover:bg-gray-400 hover:text-white border-l-4" href="/shipping">Shipping</Link>
            </li>
        </ul>
        <div className="flex-1 bg-gray-100 min-h-[600px] p-8">
            <div>
                This is Profile
            </div>
        </div>
    </div>
  )
}

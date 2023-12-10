'use client';

import { UserContext } from "@/providers/AuthProvider";
import ProfileSection from "@/section/ProfileSection";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

function ProfilePage() {
  const [pageLoad, setPageLoad] = useState(true);
  const {state} = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if(!state?.token) {
      router.replace('login');
    } else {
      setPageLoad(false);
    }
  }, [router, state])

  if(pageLoad) {
    return <div>Loading...</div>
  }

  return (
    <div className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
      <ProfileSection />
    </div>
  )
}

export default ProfilePage;
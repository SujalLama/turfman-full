import ProfileSection from "@/section/ProfileSection";

function ProfilePage() {

  return (
    <div className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
      <div>Welcome to my profile page.</div>
    <ProfileSection />
    </div>
  )
}

export default ProfilePage;
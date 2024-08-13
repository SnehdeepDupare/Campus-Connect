import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user";
import { ProfileHeader } from "@/components/shared/profile-header";
import { PostsTab } from "@/components/shared/posts-tab";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-12 border-b">
        <p className="border-b-2 w-fit border-b-primary font-bold text-lg ">
          Posts
        </p>
      </div>

      <div className="mt-9">
        <PostsTab
          currentUserId={user.id}
          accountId={userInfo.id}
          accountType="User"
        />
      </div>
    </section>
  );
};

export default ProfilePage;

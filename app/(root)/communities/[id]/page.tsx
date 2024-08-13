import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";

import { ProfileHeader } from "@/components/shared/profile-header";
import { fetchCommunityDetails } from "@/lib/actions/community";
import { PostsTab } from "@/components/shared/posts-tab";
import { UserCard } from "@/components/user-card";
import { communityTabs } from "@/constants";

const CommunityPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const communityDetails = await fetchCommunityDetails(params.id);

  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.createdBy.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type="Community"
      />
      <div className="mt-12 border-b w-full" />

      <div className="mt-5">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="flex min-h-[50px] flex-1 items-center gap-3 dark:text-[#efefef] data-[state=active]:bg-[#0e0e12] data-[state=active]:text-[#efefef]">
            {communityTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="flex min-h-[40px] flex-1 items-center gap-3 dark:text-[#efefef] dark:data-[state=active]:text-[#efefef]"
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain invert dark:invert-0"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Posts" && (
                  <p className="ml-1 rounded-sm bg-[#5C5C7B] px-2 py-1 text-xs font-medium text-[#efefef]">
                    {communityDetails.posts.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="posts" className="w-full text-light-1">
            {/* @ts-ignore */}
            <PostsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType="Community"
            />
          </TabsContent>

          <TabsContent value="members" className="mt-9 w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {communityDetails.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CommunityPage;

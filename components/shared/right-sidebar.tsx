import { currentUser } from "@clerk/nextjs/server";

import { fetchCommunities } from "@/lib/actions/community";
import { fetchUsers } from "@/lib/actions/user";
import { UserCard } from "../user-card";
import Link from "next/link";

export const RightSidebar = async () => {
  const user = await currentUser();
  if (!user) return null;

  const similarMinds = await fetchUsers({
    userId: user.id,
    pageSize: 4,
  });

  const suggestedCommunities = await fetchCommunities({ pageSize: 4 });

  return (
    <section className="custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-dark-2 px-10 pb-6 pt-9 max-lg:hidden shadow-md dark:shadow-none">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="font-bold text-xl text-light-1">
          Suggested Communities
        </h3>

        <div className="mt-7 flex flex-col gap-9">
          {suggestedCommunities.communities.length > 0 ? (
            <>
              {suggestedCommunities.communities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType="Community"
                />
              ))}
            </>
          ) : (
            <p className="!text-sm !font-normal text-[#7878A3]">
              No communities yet
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="font-bold text-xl text-light-1">Similar Minds</h3>
        <div className="mt-7 flex flex-col gap-10">
          {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                />
              ))}
            </>
          ) : (
            <p className="!text-sm !font-normal text-[#7878A3]">No users yet</p>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Created by{" "}
        <Link
          href="https://snehdeepdupare.in"
          target="_blank"
          className="hover:underline font-bold"
        >
          Snehdeep Dupare.
        </Link>
      </div>
    </section>
  );
};

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/lib/actions/user";
import Link from "next/link";
import Image from "next/image";

const ActivityPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);
  return (
    <>
      <h1 className="font-bold text-3xl">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/post/${activity.parentId}`}>
                <article className="flex items-center gap-2 rounded-md shadow-md dark:shadow-none border dark:border-none dark:bg-[#121417] px-7 py-4">
                  <Image
                    src={activity.author.image}
                    alt="user_logo"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-sm dark;text-white">
                    <span className="mr-1 text-primary font-semibold">
                      {activity.author.name}
                    </span>{" "}
                    replied to your post.
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </>
  );
};

export default ActivityPage;

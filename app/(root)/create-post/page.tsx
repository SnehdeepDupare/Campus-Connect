import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { PostInput } from "@/components/post/post-input";
import { fetchUser } from "@/lib/actions/user";

const CreatePostPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <>
      <h1 className="font-bold text-3xl">Create Post</h1>

      <PostInput userId={userInfo._id} userImg={userInfo.image} />
    </>
  );
};

export default CreatePostPage;

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user";
import { fetchPostById } from "@/lib/actions/post";
import { PostCard } from "@/components/post/PostCard";
import { Comment } from "@/components/post/comment";

const PostPage = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const post = await fetchPostById(params.id);
  return (
    <section className="relative">
      <div>
        <PostCard
          id={post._id}
          currentUserId={user.id}
          parentId={post.parentId}
          content={post.text}
          postImage={post.postImage}
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
          likes={post.likes}
          comments={post.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          postId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {post.children.map((childItem: any) => (
          <PostCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            postImage={childItem.postImage}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            likes={childItem.likes}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default PostPage;

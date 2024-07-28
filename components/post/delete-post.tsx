"use client";

import { Delete, Trash, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { deletePost } from "@/lib/actions/post";

interface Props {
  postId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

export const DeletePost = ({
  postId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId) return null;

  return (
    <div className="flex items-center gap-x-2 cursor-pointer">
      <Trash2
        className="object-contain h-5 w-5"
        onClick={async () => {
          await deletePost(JSON.parse(postId), pathname);
          if (!parentId || !isComment) {
            router.push("/");
          }
        }}
      />
      <p>Delete Post</p>
    </div>
  );
};

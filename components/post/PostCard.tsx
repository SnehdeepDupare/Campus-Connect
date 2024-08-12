import Image from "next/image";
import Link from "next/link";
import {
  EllipsisVertical,
  Heart,
  LinkIcon,
  MessageCircle,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { formatDateString } from "@/lib/utils";
import { MoreButton } from "./more-button";
import { ShareButton } from "./share-button";
import { LikeButton } from "./like-button";
import { Gallery } from "../shared/gallery";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  postImage: string | null;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  likes: string[];
  isComment?: boolean;
}

export const PostCard = ({
  id,
  currentUserId,
  parentId,
  content,
  postImage,
  author,
  community,
  createdAt,
  comments,
  likes,
  isComment,
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment
          ? "px-0 xs:px-7"
          : "border dark:border-none shadow-md dark:shadow-none dark:bg-secondary/40 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
          </div>

          <div className="flex w-full flex-col">
            <div className="flex flex-col ">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer font-semibold text-lg dark:text-white">
                  {author.name}
                </h4>
              </Link>

              <div className="flex items-center">
                <p className="text-xs font-medium text-[#697C89]">
                  {formatDateString(createdAt)}{" "}
                </p>

                {!isComment && community && (
                  <Link
                    href={`/communities/${community.id}`}
                    className="flex items-center"
                  >
                    <p className="text-xs font-medium text-[#697C89]">
                      {community && ` - ${community.name} Community`}
                    </p>
                    <Image
                      src={community.image}
                      alt={community.name}
                      width={14}
                      height={14}
                      className="ml-1 rounded-full object-cover"
                    />
                  </Link>
                )}
              </div>
            </div>

            <p className="mt-2 text-sm dark:text-[#EFEFEF]">{content}</p>

            {postImage && (
              <Gallery authorName={author.name} image={postImage} />
            )}

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex items-center max-sm:justify-between md:gap-4">
                <LikeButton
                  postId={id}
                  currentUserId={currentUserId}
                  initialLikes={likes}
                />

                <Button variant="ghost" className="rounded-full" size="icon">
                  <Link href={`/post/${id}`}>
                    <MessageCircle className="h-6 w-6" />
                  </Link>
                </Button>

                <ShareButton postId={id} />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/post/${id}`}>
                  <p className="mt-1 text-xs font-medium dark:text-[#697C89]">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full" size="icon">
                <EllipsisVertical className="h-5 w-5 cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem> */}
        <MoreButton
          postId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
        {/* </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        */}
      </div>

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/post/${id}`}>
            <p className="mt-1 text-xs font-medium text-[#697C89]">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}
    </article>
  );
};

"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { likePost, unlikePost } from "@/lib/actions/post";
import { toast } from "sonner";

interface LikeButtonProps {
  postId: string;
  currentUserId: string;
  initialLikes: string[];
}

export const LikeButton = ({
  postId,
  currentUserId,
  initialLikes = [],
}: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  const isLiked = likes.includes(currentUserId);

  const handleLike = async () => {
    setIsLiking(true);

    try {
      const updatedPost = isLiked
        ? await unlikePost(postId, currentUserId)
        : await likePost(postId, currentUserId);

      setLikes(updatedPost.likes);
      !isLiked && toast.success("Post Liked!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to Like the post!");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        className="rounded-full"
        size="icon"
        onClick={handleLike}
        disabled={isLiking}
      >
        <Heart
          className={`h-6 w-6 ${isLiked && "text-red-500 fill-red-500"}`}
        />
      </Button>
      <span className="ml-2 text-sm">{likes.length}</span>
    </div>
  );
};

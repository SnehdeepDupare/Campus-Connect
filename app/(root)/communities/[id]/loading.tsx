import { ProfileSkeleton } from "@/components/shared/skeletons/profile-skeleton";
import { FeedSkeleton } from "@/components/shared/skeletons/feed-skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <ProfileSkeleton />

      <div className="mt-14 space-y-4">
        <FeedSkeleton />
        <FeedSkeleton />
        <FeedSkeleton />
        <FeedSkeleton />
      </div>
    </div>
  );
}

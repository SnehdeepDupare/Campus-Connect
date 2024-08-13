import { FeedSkeleton } from "@/components/shared/skeletons/feed-skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <FeedSkeleton />
      <FeedSkeleton />
      <FeedSkeleton />
      <FeedSkeleton />
      <FeedSkeleton />
    </div>
  );
}

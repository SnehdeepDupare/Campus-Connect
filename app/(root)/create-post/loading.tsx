import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-10 w-[200px]" />

      <Skeleton className="h-80 mt-10" />
    </div>
  );
}

import React from "react";
import { Skeleton } from "../../ui/skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-4" />
      <Skeleton className="h-4 " />
      <Skeleton className="h-4 " />
      <Skeleton className="h-4 max-w-96" />
    </div>
  );
};

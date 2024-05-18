import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const FilterSkeleton = () => {
  return (
    <SkeletonTheme>
      <p className="flex-between mb-2">
        <Skeleton className="rounded-lg" width={190}></Skeleton>
      </p>
    </SkeletonTheme>
  );
};

export default FilterSkeleton;

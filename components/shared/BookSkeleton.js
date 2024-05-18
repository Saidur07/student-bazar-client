import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const BookSkeleton = () => {
  return (
    <div className="card w-full p-2 rounded container bg-base-100 border lg:hover:scale-[1.01] transition-all cursor-pointer">
      <SkeletonTheme>
        <div className=" w-full">
          <Skeleton className="rounded-lg" height={200}></Skeleton>
        </div>
        <p className="my-1">
          {" "}
          <Skeleton className="rounded-lg"></Skeleton>
        </p>
        <p className="flex-between my-1">
          {" "}
          <Skeleton className="rounded-lg" width={150}></Skeleton>
        </p>
        <p className="flex-between">
          {" "}
          <Skeleton className="rounded-lg" width={100}></Skeleton>
          <Skeleton
            className="rounded-lg mx-2"
            width={40}
            height={40}
          ></Skeleton>
        </p>
      </SkeletonTheme>
    </div>
  );
};

export default BookSkeleton;

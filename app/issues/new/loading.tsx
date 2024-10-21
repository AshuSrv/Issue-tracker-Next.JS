import React from "react";
import Skeleton from "@/app/components/Skeleton";

const LoadingNewIssuePage = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Skeleton height="6rem" />
      <Skeleton width="4rem" />
    </div>
  );
};

export default LoadingNewIssuePage;

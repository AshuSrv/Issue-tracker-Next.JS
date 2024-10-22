import React from "react";
import Skeleton from "@/app/components/Skeleton";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Skeleton height="6rem" />
      <Skeleton width="8rem" />
    </div>
  );
};

export default IssueFormSkeleton;

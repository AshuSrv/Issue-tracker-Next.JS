import { Card } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const LoadingIssueDetail = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <div className="flex space-x-3 my-3">
        <Skeleton width="4rem" />
        <Skeleton width="8rem" />
      </div>
      <Card className="prose" mt="3">
        <Skeleton />
      </Card>
    </div>
  );
};

export default LoadingIssueDetail;

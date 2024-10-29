import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

interface props {
  searchParams: { page: string };
}

export default async function Home({ searchParams }: props) {
  const openIssue = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const closedIssue = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const inPorgressIssue = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <div>
      <LatestIssues />
      <IssueSummary
        open={openIssue}
        closed={closedIssue}
        inProgress={inPorgressIssue}
      />
    </div>
  );
}

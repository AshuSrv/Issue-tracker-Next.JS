import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Box, Flex, Grid } from "@radix-ui/themes";

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
    <Grid columns={{ initial: "1", md: "5" }} gap="4">
      <Flex className="md:col-span-2" direction="column" gap="5">
        <IssueSummary
          open={openIssue}
          closed={closedIssue}
          inProgress={inPorgressIssue}
        />
        <IssueChart
          open={openIssue}
          closed={closedIssue}
          inProgress={inPorgressIssue}
        />
      </Flex>
      <Box className="md:col-span-3">
        <LatestIssues />
      </Box>
    </Grid>
  );
}

import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";

interface props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: props) => {
  const parseId = Number(params.id);
  if (isNaN(parseId)) notFound();

  const issueDetails = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issueDetails) notFound();
  await delay(2000);
  return (
    <div>
      <Heading>{issueDetails?.title}</Heading>
      <div className="flex space-x-3 my-3">
        <IssueStatusBadge status={issueDetails?.status} />
        <Text>{issueDetails?.createdAt.toDateString()}</Text>
      </div>
      <Card className="prose" mt="3">
        <p>{issueDetails?.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;

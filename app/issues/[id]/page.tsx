import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Grid, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Heading>{issueDetails?.title}</Heading>
        <div className="flex space-x-3 my-3">
          <IssueStatusBadge status={issueDetails?.status} />
          <Text>{issueDetails?.createdAt.toDateString()}</Text>
        </div>
        <Card className="prose" mt="3">
          <p>{issueDetails?.description}</p>
        </Card>
      </Box>
      <Box>
        <div className="flex flex-col gap-3">
          <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issueDetails.id}/edit`}>Edit Issue</Link>
          </Button>
          <Button color="red">
            <TrashIcon />
            <Link href={`/issues/${issueDetails.id}/delete`}>Delete Issue</Link>
          </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;

import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/api/auth/[...nextauth]/AuthOptions";
import AssigneSelect from "./AssigneSelect";

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

  const session = await getServerSession(AuthOptions);

  await delay(2000);
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Heading>{issueDetails?.title}</Heading>
        <div className="flex space-x-3 my-3">
          <IssueStatusBadge status={issueDetails?.status} />
          <Text>{issueDetails?.createdAt.toDateString()}</Text>
        </div>
        <Card className="prose max-w-full" mt="3">
          <p>{issueDetails?.description}</p>
        </Card>
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="3">
            <AssigneSelect issue={issueDetails} />
            <Button>
              <Pencil2Icon />
              <Link href={`/issues/${issueDetails.id}/edit`}>Edit Issue</Link>
            </Button>
            <DeleteIssueButton issueId={issueDetails.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

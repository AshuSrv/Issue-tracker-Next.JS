import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { number } from "zod";

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

  return (
    <div>
      <p>{issueDetails?.id}</p>
      <p>{issueDetails?.title}</p>
      <p>{issueDetails?.description}</p>
      <p>{issueDetails?.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;

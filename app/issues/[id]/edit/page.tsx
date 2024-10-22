import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import LoadingNewIssuePage from "../../new/loading";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingNewIssuePage />,
});
// Loading Issue Form using lazy loading so if in future we use any component like SimpleMDE which is client component.

interface props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;

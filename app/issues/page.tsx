import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import Link from "@/app/components/Link";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";
import IssuesAction from "./IssuesAction";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import { Metadata } from "next";

interface props {
  searchParams: { status: Status; page: string };
}
const IssuesPage = async ({ searchParams }: props) => {
  const statusValue = Object.keys(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;

  const issues = await prisma.issue.findMany({
    where: { status: statusValue },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalIssueCount = await prisma.issue.count({
    where: { status: statusValue },
  });

  await delay(1500);

  return (
    <Flex direction={"column"} gap={"5"}>
      {/* <div className="flex-col space-y-5"> */}
      <IssuesAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
                {/* When table is shrunk we need it to behave as a block element (e.g., in a non-table layout), */}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {/* If the element needs to be displayed as a table cell on bigger screens */}
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={totalIssueCount}
      />
      {/* </div> */}
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "View all project issues",
};

// This will make this component dynamic instead of static to avoid full route cache (server cache)
export const dynamic = "force-dynamic"; //Output of this page has to be refereshed every time
// export const revalidate = 0; // Exactly same as above statement
// export const revalidate = 60; // Means output of this page has to be revalidated every 60 second

// Test commit
export default IssuesPage;

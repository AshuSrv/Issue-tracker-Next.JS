import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: String; color: "red" | "green" | "violet" }
> = {
  OPEN: { label: "Open", color: "red" },
  CLOSED: { label: "Closed", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
};

const IssueStatusBadge = ({ status }: props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;

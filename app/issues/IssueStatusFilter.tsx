"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const issues = [
  {
    label: "All",
    value: " ",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || " "}
      onValueChange={(status) => {
        const query = status.trim().length > 0 ? `?status=${status}` : "";
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder="Select an Issue type..." />
      <Select.Content>
        {issues.map((issue) => (
          <Select.Item key={issue.value} value={issue.value}>
            {issue.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;

"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    {
      label: "Open",
      value: open,
    },
    {
      label: "Closed",
      value: closed,
    },
    {
      label: "In Progress",
      value: inProgress,
    },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={40} fill="teal" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;

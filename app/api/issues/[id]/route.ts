import { updateIssueSchema } from "@/app/ValiadtionSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import AuthOptions from "../../auth/[...nextauth]/AuthOptions";
import { error } from "console";

interface props {
  params: { id: string };
}

export async function PATCH(nextRequest: NextRequest, { params }: props) {
  const session = await getServerSession(AuthOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await nextRequest.json();
  const validation = updateIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  if (body?.assignedToUserId) {
    console.log(body.assignedToUserId);
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }
  }
  console.log(body.assignedToUserId);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body?.title,
      description: body?.description,
      assignedToUserId: body?.assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(nextRequest: NextRequest, { params }: props) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({}, { status: 200 });
}

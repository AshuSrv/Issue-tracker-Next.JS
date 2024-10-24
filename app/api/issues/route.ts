import { createIssueSchema } from "@/app/ValiadtionSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import AuthOptions from "../auth/[...nextauth]/AuthOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

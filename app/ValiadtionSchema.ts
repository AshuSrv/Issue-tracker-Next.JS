import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is Mandatory").max(255),
  description: z.string().min(1, "Description is Mandatory").max(65535),
});

export const updateIssueSchema = z.object({
  title: z.string().min(1, "Title is Mandatory").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is Mandatory")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "ID is mandatory")
    .max(255)
    .optional()
    .nullable(),
});

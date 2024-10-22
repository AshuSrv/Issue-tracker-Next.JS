"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/ValiadtionSchema";
import { z } from "zod";
import { Spinner, ErrorMessage } from "@/app/components";
import { Issue } from "@prisma/client";

type IssueFormType = z.infer<typeof createIssueSchema>;

interface props {
  issue?: Issue;
}

const IssueForm = ({ issue }: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormType>({
    resolver: zodResolver(createIssueSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
      //   To tell NextJs to refetch the page instead of invalidating automatically after 30 sec(bcoz Dynamic page).
    } catch (error) {
      setIsLoading(false);
      setError("Something Went Wrong");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Enter a Title"
          defaultValue={issue?.title}
          {...register("title")}
        />
        {errors.title && <ErrorMessage>{errors?.title?.message}</ErrorMessage>}

        <TextArea
          placeholder="Description"
          defaultValue={issue?.description}
          {...register("description")}
        />
        {errors.description && (
          <ErrorMessage>{errors?.description?.message}</ErrorMessage>
        )}

        <Button disabled={isLoading}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;

"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/ValiadtionSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("Something Went Wrong");
          }
        })}
      >
        <TextField.Root placeholder="Enter a Title" {...register("title")} />
        {errors.title && <ErrorMessage>{errors?.title?.message}</ErrorMessage>}

        <TextArea placeholder="Description" {...register("description")} />
        {errors.description && (
          <ErrorMessage>{errors?.description?.message}</ErrorMessage>
        )}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;

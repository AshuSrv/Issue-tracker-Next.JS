"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface IssueForm {
  title: String;
  description: String;
}

const NewIssuePage = () => {
  const { register, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <TextField.Root placeholder="Enter a Title" {...register("title")} />
      <TextArea placeholder="Description" {...register("description")} />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;

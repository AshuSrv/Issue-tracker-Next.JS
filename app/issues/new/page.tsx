"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IssueForm {
  title: String;
  description: String;
}

const NewIssuePage = () => {
  const { register, handleSubmit } = useForm<IssueForm>();
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
        <TextArea placeholder="Description" {...register("description")} />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;

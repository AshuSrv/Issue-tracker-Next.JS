import React from "react";
// import IssueForm from "../_components/IssueForm";
import dynamic from "next/dynamic";
import LoadingNewIssuePage from "./loading";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingNewIssuePage />,
});
// Loading Issue Form using lazy loading so if in future we use any component like SimpleMDE which is client component.

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;

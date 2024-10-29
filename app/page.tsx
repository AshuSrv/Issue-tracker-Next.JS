import LatestIssues from "./LatestIssues";

interface props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: props) {
  return (
    <div>
      <LatestIssues />
    </div>
  );
}

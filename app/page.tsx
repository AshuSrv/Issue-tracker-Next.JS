import Pagination from "./components/Pagination";

interface props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: props) {
  return <div>Home Page</div>;
}

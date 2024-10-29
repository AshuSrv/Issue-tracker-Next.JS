import Pagination from "./components/Pagination";

interface props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: props) {
  return (
    <div>
      <Pagination
        pageSize={5}
        currentPage={parseInt(searchParams.page)}
        itemCount={20}
      />
    </div>
  );
}

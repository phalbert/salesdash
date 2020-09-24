import React, { useState } from "react";
import { Pagination } from "./pagination";
import SalesTable from "./table";
import { useFetchMany } from "./hooks";

export default function SalesView() {
  const [page, setPage] = useState(1);

  const { loading, error, data } = useFetchMany(page);

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.total.toLocaleString()} sales</h1>
      <SalesTable results={data.results} />
      <Pagination
        className="pb-8"
        page={page}
        total={data.total}
        limit={10}
        setPage={setPage}
      />
    </div>
  );
}

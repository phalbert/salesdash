import useSWR from "swr";

export const fetcher = (url) => fetch(url).then((res) => res.json());

export function useFetchMany(page) {
  console.log("page", page);
  const { data, error } = useSWR(`http://localhost:3000/reports/sales?page=${page}`, fetcher);
  return {
    data: data,
    loading: !error && !data,
    error: error,
  };
}

import useSWR from "swr";

export const fetcher = (url) => fetch(url).then((res) => res.json());

const baseURL = process.env.API_URL || 'http://localhost:3000';

export function useFetchMany(page) {
  const { data, error } = useSWR(`/api/sales?page=${page}`, fetcher);
  return {
    data: data,
    loading: !error && !data,
    error: error,
  };
}

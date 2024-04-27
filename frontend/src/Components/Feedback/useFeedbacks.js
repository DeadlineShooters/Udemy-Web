import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants.js";

export function useFeedbacks() {
  const queryClient = useQueryClient();
  console.log("Quuery client: " + queryClient);
  const [searchParams] = useSearchParams();

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page")); // default is first page

  // QUERY
  const {
    isLoading,
    data: { data: feedbacks, count } = {},
    error,
  } = useQuery({
    queryKey: ["feedbacks", page],
    queryFn: () => axios.get(`${process.env.REACT_APP_BACKEND_HOST}/feedbacks?page=${page}`).then((res) => res.data),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["feedbacks", page + 1],
      queryFn: () => axios.get(`${process.env.REACT_APP_BACKEND_HOST}/feedbacks?page=${page + 1}`).then((res) => res.data),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["feedbacks", page - 1],
      queryFn: () => axios.get(`${process.env.REACT_APP_BACKEND_HOST}/feedbacks?page=${page - 1}`).then((res) => res.data),
    });

  return { isLoading, error, feedbacks, count };
}

import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants.js";

export function useFeedbacks(courseID) {
  const queryClient = useQueryClient();
  console.log("IN use feedback: courseID=" + courseID);
  const [searchParams] = useSearchParams();

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page")); // default is first page

  // QUERY
  const { isLoading, data, error } = useQuery({
    queryKey: ["feedbacks", page],
    queryFn: () =>
      axios.get(`${process.env.REACT_APP_BACKEND_HOST}/feedback/${courseID}?page=${page}`).then((res) => {
        console.log("Data in use feedback", res.data);
        return res.data;
      }),
  });

  const { feedbacks, count } = data || {};
  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["feedbacks", page + 1],
      queryFn: () => axios.get(`${process.env.REACT_APP_BACKEND_HOST}/feedback/${courseID}?page=${page + 1}`).then((res) => res.data),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["feedbacks", page - 1],
      queryFn: () => axios.get(`${process.env.REACT_APP_BACKEND_HOST}/feedback/${courseID}?page=${page - 1}`).then((res) => res.data),
    });

  return { isLoading, error, feedbacks, count };
}

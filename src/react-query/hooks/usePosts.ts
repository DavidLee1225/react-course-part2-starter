import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import axios, { all } from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
interface PostQuery {
  pageSize: number;
}

const usePosts = (query: PostQuery) => {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query.pageSize],
    queryFn: ({ pageParam }) =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: pageParam,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === query.pageSize) {
        return allPages.length + 1; // 下一页页码
      }
      return undefined;
    },
  });
};
export default usePosts;

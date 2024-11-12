import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostQuery } from "../entities/PostQuery";
import { Post } from "../entities/Post";

const usePosts = (query: PostQuery) => {
  const fetchPosts = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          userId: query.userId == 0 ? null : query.userId,
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000,
    keepPreviousData: true,
  });
};

export default usePosts;

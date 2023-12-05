import useSWR from "swr";
import fetchUtils from "../utils/fetchUtils";
import { useEffect, useState } from "react";

type IPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const useTestPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data, error, isLoading, isValidating } = useSWR(
    "/posts",
    fetchUtils.testGet,
  );

  useEffect(() => {
    if (data) {
      setPosts(data.data);
    }
  }, [data]);

  return { posts, error, isLoading, isValidating };
};

export default useTestPosts;

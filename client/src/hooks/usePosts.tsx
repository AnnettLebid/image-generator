import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";

export const getPosts = async (page = 1, options = {}) => {
  const posts = await axios.get(`${BASE_URL}?page=${page}`, options);
  return await posts.data;
};

const usePosts = (pageNum: number) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;
    getPosts(pageNum, { signal })
      .then((data) => {
        console.log("data", data);
        setResults((prev) => [...prev, ...data.posts]);
        setHasNextPage(Boolean(data.isNextPage));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: error.message });
      });

    return () => controller.abort();
  }, [pageNum]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;

import { useEffect, useState } from "react";
import { IArticle, getArticles } from "../../../mocks/board/article";

const useMockArticles = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [articles, setArticles] = useState<IArticle[]>([]);

  const getMockArticles = async () => {
    const articles = await getArticles();
    setArticles(articles);
    setStatus("success");
  };

  useEffect(() => {
    if (status !== "idle") return;
    setStatus("loading");
    getMockArticles();
  }, [status]);

  return { articles, status };
};

export default useMockArticles;

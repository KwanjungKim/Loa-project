import { useEffect } from "react";
import fetchUtils from "../../utils/fetchUtils";

interface Props {
  articleId: string;
}

export default function RaidArticle({ articleId }: Props) {
  const getArticle = async (id: string) => {
    const { data } = await fetchUtils.post("/board/getArticle", {
      board_number: id,
    });
    console.log("data", data);
  };
  useEffect(() => {
    getArticle(articleId);
  }, [articleId]);
  return <div>{articleId}</div>;
}

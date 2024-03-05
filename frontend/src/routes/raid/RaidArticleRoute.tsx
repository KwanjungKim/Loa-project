import { useParams } from "react-router-dom";
import RaidArticle from "../../components/RaidArticle";

export default function RaidArticleRoute() {
  const { id } = useParams();
  return typeof id === "string" ? (
    <RaidArticle key={id} articleId={id} />
  ) : (
    <div>loading...</div>
  );
}

interface Props {
  articleId: string;
}

export default function RaidArticle({ articleId }: Props) {
  return <div>{articleId}</div>;
}

import useArticles from "../../hooks/useArticles";

const Raid = () => {
  const { articles } = useArticles();

  return (
    <div>
      {articles.map((article) => (
        <div key={article.board_number}>
          <p>{article.title}</p>
          <p>{article.content}</p>
        </div>
      ))}
      <button>add</button>
    </div>
  );
};

export default Raid;

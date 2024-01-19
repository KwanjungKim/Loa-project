import useMockArticles from "./_hooks/useMockArticles";

const Raid = () => {
  const { articles, status } = useMockArticles();
  console.log("articles", articles);
  console.log("status", status);
  return (
    <div>
      <p>{status}</p>
      <button>add</button>
    </div>
  );
};

export default Raid;

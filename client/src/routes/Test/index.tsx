import { useRecoilState } from "recoil";
import testCountState, { testCountActions } from "../../atoms/testCount";
import useTestPosts from "../../hooks/useTestPosts";

const TestRoute = () => {
  const [testCount, setTestCount] = useRecoilState(testCountState);
  const { posts } = useTestPosts();
  return (
    <div>
      <h1>{testCount}</h1>
      <div>
        <button
          onClick={() => {
            setTestCount(testCountActions.increment);
          }}
        >
          plus
        </button>
        <button
          onClick={() => {
            setTestCount(testCountActions.decrement);
          }}
        >
          minus
        </button>
      </div>
      <div>
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </div>
  );
};

export default TestRoute;

import { useRecoilState } from "recoil";
import testCountState, { testCountActions } from "../../atoms/testCount";

const TestRoute = () => {
  const [testCount, setTestCount] = useRecoilState(testCountState);
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
    </div>
  );
};

export default TestRoute;

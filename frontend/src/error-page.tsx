import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return <div>error-page</div>;
};

export default ErrorPage;

import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";

const App = () => {
  console.log("hihi");
  return (
    <RecoilRoot>
      <Outlet />
    </RecoilRoot>
  );
};

export default App;

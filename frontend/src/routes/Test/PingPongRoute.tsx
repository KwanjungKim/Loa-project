import { SmallButton } from "../../components/common/Button";
import fetchUtils from "../../utils/fetchUtils";

const PingPongRoute = () => {
  const testPingPong1 = async () => {
    const response = await fetch("http://localhost:8080/api/ping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: "ping" }),
    });
    const data = await response.json();
    console.log(data);
  };
  const testPingPong2 = async () => {
    const response = await fetchUtils.post("/api/ping", {
      id: "ping",
    });
    console.log(response);
  };
  return (
    <div>
      <SmallButton variant="contained" onClick={testPingPong1}>
        Ping 1
      </SmallButton>
      <SmallButton variant="contained" onClick={testPingPong2}>
        Ping 2
      </SmallButton>
    </div>
  );
};

export default PingPongRoute;

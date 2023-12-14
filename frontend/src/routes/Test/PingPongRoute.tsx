import useSWR from "swr";
import { SmallButton } from "../../components/common/Button";
import fetchUtils, { IResponseData } from "../../utils/fetchUtils";

const PingPongRoute = () => {
  const { data, isLoading } = useSWR<IResponseData>(
    "/api/ping",
    (url: string) => {
      return fetchUtils.post(url, { id: "ping" });
    },
  );

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
      <div>
        <SmallButton variant="contained" onClick={testPingPong1}>
          Ping 1
        </SmallButton>
        <SmallButton variant="contained" onClick={testPingPong2}>
          Ping 2
        </SmallButton>
      </div>
      <br />
      <div>
        <h3>ping response by SWR &darr;</h3>
        <p>{isLoading ? "loading swr..." : JSON.stringify(data)}</p>
      </div>
    </div>
  );
};

export default PingPongRoute;

import { useState } from "react";
import useSWR from "swr";

// components
import { SmallButton } from "../../components/common/Button";

type IPingPongResponse = {
  character_name: string | null;
  message: string;
  status: "success" | "fail";
};

const fetcher = async (
  url: string,
  method: string,
  data: any,
): Promise<IPingPongResponse> => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error", error);
    return {
      character_name: null,
      message: "error happened",
      status: "fail",
    };
  }
};

const PingPongRoute = () => {
  const [isPong, setIsPong] = useState(false);

  const { data, isLoading } = useSWR<IPingPongResponse>(
    "/api/ping",
    (url: string) => {
      return fetcher(url, "POST", { id: "ping" });
    },
  );

  const testPingPong = async () => {
    setIsPong(false);
    const pingPongData = await fetcher(
      "http://localhost:8080/api/ping",
      "POST",
      { id: "ping" },
    );
    console.log("pingPongData", pingPongData);
    setIsPong(pingPongData.status === "success");
  };

  return (
    <div>
      <div>
        <SmallButton
          disabled={isPong}
          variant="contained"
          onClick={testPingPong}
        >
          Ping
        </SmallButton>
        <p>{isPong ? "🏓 PONG" : "PING 🏓"}</p>
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// utils
import fetchUtils from "../../utils/fetchUtils";

// styles
import styles from "./index.module.scss";

// components
import { Button } from "@mui/material";
import useSWR from "swr";

type IPingData = {
  success: boolean;
  data: string | null;
};

const TestRoute = () => {
  const [ping, setPing] = useState("🏓 PING");

  const { data, isLoading } = useSWR<IPingData>("/api/ping", (url: string) =>
    fetchUtils.post(url, { id: "ping" }),
  );

  useEffect(() => {
    if (!isLoading) {
      if (data?.success) {
        setPing("🏓 PONG");
      } else {
        setPing("NO PONG 😢");
      }
    }
  }, [data, isLoading]);

  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h2>Test</h2>
      <div>
        <p>{ping}</p>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/test/buttons")}
        >
          buttons
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/test/modals")}
        >
          modals
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/test/calendar")}
        >
          calendar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/test/pingpong")}
        >
          pingpong
        </Button>
      </div>
    </div>
  );
};

export default TestRoute;

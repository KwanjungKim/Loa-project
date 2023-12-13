import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// utils
import fetchUtils from "../../utils/fetchUtils";

// styles
import styles from "./index.module.scss";

// components
import { Button } from "@mui/material";

const TestRoute = () => {
  const [ping, setPing] = useState("🏓 PING");

  const navigate = useNavigate();

  const getHello = async () => {
    const res = await fetchUtils.get("/api/hello");
    console.log(res);
  };

  const pingPong = async () => {
    const res = await fetchUtils.post("/api/ping", {
      id: "ping",
    });
    console.log(res);
    if (res.status !== 200) {
      setPing("❗️ No PONG");
    } else {
      setPing("🏓 PONG");
    }
  };

  useEffect(() => {
    getHello();
    pingPong();
  }, []);

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
      </div>
    </div>
  );
};

export default TestRoute;

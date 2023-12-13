import { Button } from "@mui/material";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import fetchUtils from "../../utils/fetchUtils";

const TestRoute = () => {
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
  };

  useEffect(() => {
    getHello();
    pingPong();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Test</h2>
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

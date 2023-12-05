import { Button } from "@mui/material";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const TestRoute = () => {
  const navigate = useNavigate();
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

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
      </div>
    </div>
  );
};

export default TestRoute;

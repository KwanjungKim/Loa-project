import Button from "@mui/material/Button";

const TestComponents = () => {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => alert("hello test")}
      >
        hello test
      </Button>
    </div>
  );
};

export default TestComponents;

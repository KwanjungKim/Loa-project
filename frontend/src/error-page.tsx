import { useRouteError } from "react-router-dom";

// components
import Button from "@components/buttons/Button";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  function writeMail() {
    window.open("mailto:1992season@gmail.com", "_blank");
  }
  function refresh() {
    window.location.reload();
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            marginBottom: "8px",
          }}
        >
          예상치 못한 오류가 발생했어요.
        </h3>
        <p
          style={{
            marginBottom: "16px",
          }}
        >
          오류가 발생한 상황을 공유해주시면
          <br />더 나은 서비스 개발에 도움이 됩니다!
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 100px)",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Button.Brand isSmall onClick={writeMail}>
            도움주기
          </Button.Brand>
          <Button.Default isSmall onClick={refresh}>
            새로고침
          </Button.Default>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

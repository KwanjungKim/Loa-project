import React from "react";

// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

// styles
import styles from "./BottomNav.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const buttonStyle: React.CSSProperties = {
  color: "var(--icon)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2px",
  fontSize: "10px",
  padding: "0",
};
const iconStyle: React.CSSProperties = {
  fontSize: "20px",
};

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

const BottomNav = ({ ...props }: Props) => {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav_bottom} {...props}>
      <div className={styles.buttons}>
        <Button
          aria-label="홈 페이지"
          onClick={() => navigate("/")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/");
            }
          }}
          sx={buttonStyle}
        >
          <HomeRoundedIcon
            focusable="false"
            aria-hidden="true"
            sx={iconStyle}
          />
          <p>홈</p>
        </Button>
        <Button
          aria-label="레이드 모집 페이지"
          onClick={() => navigate("/raid")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/raid");
            }
          }}
          sx={buttonStyle}
        >
          <GroupAddRoundedIcon
            focusable="false"
            aria-hidden="true"
            sx={iconStyle}
          />
          <p>레이드</p>
        </Button>
        <Button
          aria-label="나의 달력 페이지"
          onClick={() => navigate("/my/calendar")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/my/calendar");
            }
          }}
          sx={buttonStyle}
        >
          <CalendarMonthRoundedIcon
            focusable="false"
            aria-hidden="true"
            sx={iconStyle}
          />
          <p>달력</p>
        </Button>
        <Button
          aria-label="공략 페이지"
          onClick={() => navigate("/throughout")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/throughout");
            }
          }}
          sx={buttonStyle}
        >
          <MenuBookRoundedIcon
            focusable="false"
            aria-hidden="true"
            sx={iconStyle}
          />
          <p>공략</p>
        </Button>
      </div>
    </nav>
  );
};

export default BottomNav;

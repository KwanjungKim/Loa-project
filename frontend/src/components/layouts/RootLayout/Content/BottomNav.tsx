import React from "react";

// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

// styles
import styles from "./BottomNav.module.scss";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

const BottomNav = ({ ...props }: Props) => {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav_bottom} {...props}>
      <ButtonGroup
        variant="text"
        aria-label="navigative buttons"
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        <Button
          aria-label="홈 페이지"
          onClick={() => navigate("/")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/");
            }
          }}
          sx={{
            color: "var(--icon)",
            borderColor: "var(--icon-divider) !important",
          }}
        >
          <HomeRoundedIcon
            focusable="false"
            aria-hidden="true"
            sx={{
              fontSize: "32px",
            }}
          />
        </Button>
        <Button
          aria-label="레이드 모집 페이지"
          onClick={() => navigate("/raid")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/raid");
            }
          }}
          sx={{
            color: "var(--icon)",
            borderColor: "var(--icon-divider) !important",
          }}
        >
          <GroupAddRoundedIcon
            focusable="false"
            aria-hidden="true"
            sx={{
              fontSize: "32px",
            }}
          />
        </Button>
        <Button
          aria-label="나의 달력 페이지"
          onClick={() => navigate("/my/calendar")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/my/calendar");
            }
          }}
          sx={{
            color: "var(--icon)",
            borderColor: "var(--icon-divider) !important",
          }}
        >
          <CalendarMonthRoundedIcon
            focusable="false"
            aria-hidden="true"
            sx={{
              fontSize: "32px",
            }}
          />
        </Button>
        <Button
          aria-label="공략 페이지"
          onClick={() => navigate("/throughout")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/throughout");
            }
          }}
          sx={{
            color: "var(--icon)",
            borderColor: "var(--icon-divider) !important",
          }}
        >
          <MenuBookRoundedIcon
            focusable="false"
            aria-hidden="true"
            sx={{
              fontSize: "32px",
            }}
          />
        </Button>
      </ButtonGroup>
    </nav>
  );
};

export default BottomNav;

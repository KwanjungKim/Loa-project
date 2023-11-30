import React from "react";
import { useNavigate } from "react-router-dom";

// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

// styles
import styles from "./LeftNav.module.scss";

// components
import { Button } from "@mui/material";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

const LeftNav = ({ ...props }: Props) => {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav_left} {...props}>
      <Button
        className={styles.link_wrapper}
        aria-label="홈 페이지"
        tabIndex={0}
        onClick={() => navigate("/")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate("/");
          }
        }}
      >
        <HomeRoundedIcon
          focusable="false"
          aria-hidden="true"
          sx={{
            fontSize: "22px",
          }}
        />
        <p>홈</p>
      </Button>
      <Button
        className={styles.link_wrapper}
        aria-label="레이드 모집 페이지"
        tabIndex={0}
        onClick={() => navigate("/raid")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate("/raid");
          }
        }}
      >
        <GroupAddRoundedIcon
          focusable="false"
          aria-hidden="true"
          sx={{
            fontSize: "22px",
          }}
        />
        <p>레이드 모집</p>
      </Button>
      {/* <Link to="/my/calendar"> */}
      <Button
        className={styles.link_wrapper}
        aria-label="나의 달력 페이지"
        tabIndex={0}
        onClick={() => navigate("/my-calendar")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate("/my-calendar");
          }
        }}
      >
        <CalendarMonthRoundedIcon
          focusable="false"
          aria-hidden="true"
          sx={{
            fontSize: "22px",
          }}
        />
        <p>나의 달력</p>
      </Button>
      <Button
        className={styles.link_wrapper}
        aria-label="공략 페이지"
        tabIndex={0}
        onClick={() => navigate("/raid-guide")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate("/raid-guide");
          }
        }}
      >
        <MenuBookRoundedIcon
          focusable="false"
          aria-hidden="true"
          sx={{
            fontSize: "22px",
          }}
        />
        <p>공략</p>
      </Button>
    </nav>
  );
};

export default LeftNav;

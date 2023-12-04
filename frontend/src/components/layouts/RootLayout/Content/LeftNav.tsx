import React from "react";
import { useNavigate } from "react-router-dom";

// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";

// styles
import styles from "./LeftNav.module.scss";

// components
import TextButton from "../../../common/Button/TextButton";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

const LeftNav = ({ ...props }: Props) => {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav_left} {...props}>
      <TextButton
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
      </TextButton>
      <TextButton
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
      </TextButton>
      <TextButton
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
      </TextButton>
      <TextButton
        className={styles.link_wrapper}
        aria-label="마이 페이지"
        tabIndex={0}
        onClick={() => navigate("/my-page")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate("/my-page");
          }
        }}
      >
        <AccountBoxRoundedIcon
          focusable="false"
          aria-hidden="true"
          sx={{
            fontSize: "22px",
          }}
        />
        <p>마이페이지</p>
      </TextButton>
    </nav>
  );
};

export default LeftNav;

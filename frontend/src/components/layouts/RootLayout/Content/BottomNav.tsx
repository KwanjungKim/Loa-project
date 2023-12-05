import React from "react";
import { useNavigate } from "react-router-dom";

// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";

// components
import TextButton from "../../../common/Button/TextButton";

// styles
import styles from "./BottomNav.module.scss";

const iconStyle: React.CSSProperties = {
  fontSize: "20px",
};

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

const BottomNav = ({ ...props }: Props) => {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav_bottom} {...props}>
      <div className={styles.buttons}>
        <TextButton
          className={styles.button}
          aria-label="홈 페이지"
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
            sx={iconStyle}
          />
          <p>홈</p>
        </TextButton>
        <TextButton
          className={styles.button}
          aria-label="레이드 모집 페이지"
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
            sx={iconStyle}
          />
          <p>레이드</p>
        </TextButton>
        <TextButton
          className={styles.button}
          aria-label="나의 달력 페이지"
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
            sx={iconStyle}
          />
          <p>나의 달력</p>
        </TextButton>
        <TextButton
          className={styles.button}
          aria-label="마이 페이지"
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
            sx={iconStyle}
          />
          <p>마이페이지</p>
        </TextButton>
      </div>
    </nav>
  );
};

export default BottomNav;

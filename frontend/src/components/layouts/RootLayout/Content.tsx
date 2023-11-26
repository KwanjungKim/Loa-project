// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

// styles
import styles from "./Content.module.scss";
import { Outlet, useNavigate } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.content_wrapper}>
      {
        // left nav
      }
      <nav className={styles.nav_left}>
        <div
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
        </div>
        <div
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
        </div>
        {/* <Link to="/my/calendar"> */}
        <div
          className={styles.link_wrapper}
          aria-label="나의 달력 페이지"
          tabIndex={0}
          onClick={() => navigate("/my/calendar")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/my/calendar");
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
        </div>
        <div
          className={styles.link_wrapper}
          aria-label="공략 페이지"
          tabIndex={0}
          onClick={() => navigate("/throughout")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/throughout");
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
        </div>
      </nav>
      {
        // main content
      }
      <section className={styles.section}>
        <Outlet />
      </section>
      {
        // bottom nav
      }
      <nav className={styles.nav_bottom}>
        <div
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
              fontSize: "32px",
            }}
          />
        </div>
        <div
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
              fontSize: "32px",
            }}
          />
        </div>
        <div
          className={styles.link_wrapper}
          aria-label="나의 달력 페이지"
          tabIndex={0}
          onClick={() => navigate("/my/calendar")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/my/calendar");
            }
          }}
        >
          <CalendarMonthRoundedIcon
            focusable="false"
            aria-hidden="true"
            sx={{
              fontSize: "32px",
            }}
          />
        </div>
        <div
          className={styles.link_wrapper}
          aria-label="공략 페이지"
          tabIndex={0}
          onClick={() => navigate("/throughout")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/throughout");
            }
          }}
        >
          <MenuBookRoundedIcon
            focusable="false"
            aria-hidden="true"
            sx={{
              fontSize: "32px",
            }}
          />
        </div>
      </nav>
    </div>
  );
};

export default Content;

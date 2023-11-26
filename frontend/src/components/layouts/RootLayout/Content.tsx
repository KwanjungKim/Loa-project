// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

// styles
import styles from "./Content.module.scss";
import { Link, Outlet } from "react-router-dom";

const Content = () => {
  return (
    <div className={styles.content_wrapper}>
      {
        // left nav
      }
      <nav className={styles.nav_left}>
        <Link to="/">
          <div className={styles.link_wrapper}>
            <HomeRoundedIcon
              sx={{
                fontSize: "22px",
              }}
            />
            <p>홈</p>
          </div>
        </Link>
        <Link to="/raid">
          <div className={styles.link_wrapper}>
            <GroupAddRoundedIcon
              sx={{
                fontSize: "22px",
              }}
            />
            <p>레이드 모집</p>
          </div>
        </Link>
        <Link to="/my/calendar">
          <div className={styles.link_wrapper}>
            <CalendarMonthRoundedIcon
              sx={{
                fontSize: "22px",
              }}
            />
            <p>나의 달력</p>
          </div>
        </Link>
        <Link to="/throughout">
          <div className={styles.link_wrapper}>
            <MenuBookRoundedIcon
              sx={{
                fontSize: "22px",
              }}
            />
            <p>공략</p>
          </div>
        </Link>
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
        <Link to="/">
          <div className={styles.link_wrapper}>
            <HomeRoundedIcon
              sx={{
                fontSize: "32px",
              }}
            />
          </div>
        </Link>
        <Link to="/raid">
          <div className={styles.link_wrapper}>
            <GroupAddRoundedIcon
              sx={{
                fontSize: "32px",
              }}
            />
          </div>
        </Link>
        <Link to="/my/calendar">
          <div className={styles.link_wrapper}>
            <CalendarMonthRoundedIcon
              sx={{
                fontSize: "32px",
              }}
            />
          </div>
        </Link>
        <Link to="/throughout">
          <div className={styles.link_wrapper}>
            <MenuBookRoundedIcon
              sx={{
                fontSize: "32px",
              }}
            />
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Content;

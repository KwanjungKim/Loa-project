import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

// recoil
import { useRecoilValue } from "recoil";
import { loginState } from "@/atoms/login";

// components
import LinkedBox from "@components/boxes/LinkedBox";

// svgs
import HomeSvg from "@components/svgs/HomeSvg";
import AdvertiseSvg from "@/components/svgs/AdvertiseSvg";
import ReadingSvg from "@/components/svgs/ReadingSvg";
import AvatarSvg from "@/components/svgs/AvatarSvg";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

export default function Nav({ ...props }: Props) {
  const location = useLocation();
  const isLoggedin = useRecoilValue(loginState);

  const isActivated = useCallback(
    function isActivated(path: string) {
      return location.pathname === path;
    },
    [location],
  );

  return (
    <nav
      style={{
        height: "100%",
        padding: "15px 15px 0 0",
        // borderRight: "1px solid rgba(var(--divider), 1)",
      }}
      {...props}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to={"/"} title="홈 페이지">
          <LinkedBox activated={isActivated("/")}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <HomeSvg aria-hidden />
              <span>홈</span>
            </div>
          </LinkedBox>
        </Link>
        <Link to={"/raid"} title="레이드 모집 페이지">
          <LinkedBox activated={isActivated("/raid")}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AdvertiseSvg />
              <span>레이드 모집</span>
            </div>
          </LinkedBox>
        </Link>
        {isLoggedin ? (
          <>
            <Link to={"/my-calendar"} title="나의 달력 페이지">
              <LinkedBox>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <ReadingSvg aria-hidden />
                  <span>나의 일정</span>
                </div>
              </LinkedBox>
            </Link>
            <Link to={"/my-page"} title="나의 정보 페이지">
              <LinkedBox>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <AvatarSvg aria-hidden />
                  <span>마이 페이지</span>
                </div>
              </LinkedBox>
            </Link>
          </>
        ) : (
          <>
            <LinkedBox disabled>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <ReadingSvg color="rgba(var(--font-faded), 1)" aria-hidden />
                <span>나의 일정</span>
              </div>
            </LinkedBox>
            <LinkedBox disabled>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <AvatarSvg color="rgba(var(--font-faded), 1)" aria-hidden />
                <span>마이 페이지</span>
              </div>
            </LinkedBox>
          </>
        )}
      </div>
    </nav>
  );
}

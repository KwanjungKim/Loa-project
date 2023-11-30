import YouTube from "react-youtube";
import styles from "./raidGuideTest.module.scss";
const RaidGuideTest = () => {
  return (
    <>
      <div className={styles.container}>
        <div className="menu-3">
          <YouTube
            videoId="vS08iUfMcSo" //동영상 주소
            opts={{
              width: "100%",
              height: "300px",
              playerVars: {
                autoplay: 0, //자동 재생 여부
                modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                loop: 1, //반복 재생
                playlist: "vS08iUfMcSo", //반복 재생으로 재생할 플레이 리스트
              },
            }}
            onReady={(e) => {
              e.target.mute(); //소리 끔
            }}
          />
          <article>
            <h1>아메리카 브런치 세트</h1>
            <p>
              정성스럽게 구운 팬케익과 프렌치 토스트에 각종 사이드 디쉬, 그리고
              샐러드를 곁들인 푸짐한 정통 미국식 브런치
            </p>
            <span>16,500원</span>
          </article>
        </div>
        <div className="menu-2">
          <YouTube
            videoId="vS08iUfMcSo" //동영상 주소
            opts={{
              width: "100%",
              height: "300px",
              playerVars: {
                autoplay: 0, //자동 재생 여부
                modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                loop: 1, //반복 재생
                playlist: "vS08iUfMcSo", //반복 재생으로 재생할 플레이 리스트
              },
            }}
            onReady={(e) => {
              e.target.mute(); //소리 끔
            }}
          />
          <article>
            <h1>아메리카 브런치 세트</h1>
            <p>
              정성스럽게 구운 팬케익과 프렌치 토스트에 각종 사이드 디쉬, 그리고
              샐러드를 곁들인 푸짐한 정통 미국식 브런치
            </p>
            <span>16,500원</span>
          </article>
        </div>
        <div className="menu-3">
          <YouTube
            videoId="vS08iUfMcSo" //동영상 주소
            opts={{
              width: "100%",
              height: "300px",
              playerVars: {
                autoplay: 0, //자동 재생 여부
                modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                loop: 1, //반복 재생
                playlist: "vS08iUfMcSo", //반복 재생으로 재생할 플레이 리스트
              },
            }}
            onReady={(e) => {
              e.target.mute(); //소리 끔
            }}
          />
          <article>
            <h1>아메리카 브런치 세트</h1>
            <p>
              정성스럽게 구운 팬케익과 프렌치 토스트에 각종 사이드 디쉬, 그리고
              샐러드를 곁들인 푸짐한 정통 미국식 브런치
            </p>
            <span>16,500원</span>
          </article>
        </div>
      </div>
    </>
  );
};

export default RaidGuideTest;

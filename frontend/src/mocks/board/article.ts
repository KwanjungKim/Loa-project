type IDifficulty = "노말" | "하드" | "익스트림";
type IProficiency = "트라이" | "클경" | "반숙" | "숙련";
type IStatus = "모집중" | "모집완료" | "모집취소";

export interface IArticle {
  id?: string;
  user_number: string;
  character_name: string;
  title: string;
  content: string;
  leader: string;
  difficulty: IDifficulty;
  gate: string; // 1, 2, 3 ...
  party_members: string[];
  createdAt: string;
  departureDate: string; // 2021-09-01T12:00
  card: string;
  level: string;
  proficiency: IProficiency;
  status: IStatus;

  // todo
  // status: "모집중" | "모집완료" | "모집취소";
}

const articles: IArticle[] = [];

/*
1.각캐릭터 정보 가저오기
2.게시판 글목록 가져오기 - 군단장 난이도 관문 날짜 숙련도 다섯가지 (filter)
3.게시글 쓰기
4.게시글 읽기
4-1.신청하기
4-2.신청받기 or 거절하기
*/

/*
레이드
발탄 비아키스 쿠크세이튼 아브렐슈드 일리아칸 카멘 카양겔 상하탑

난이도 
노말 하드 익스트림

관문 
레이드마다 다름
최대 4관문

날짜
출발날짜 및 시간

숙련도
트라이 클경 반숙 숙련 
*/

export const addArticle = async (article: IArticle) => {
  setTimeout(() => {
    articles.push(article);
  }, 1500);
};

export const getArticles = async () => {
  return new Promise<IArticle[]>((resolve) => {
    setTimeout(() => {
      resolve(articles);
    }, 1500);
  });
};

export const getArticle = async (id: string) => {
  return new Promise<IArticle>((resolve, reject) => {
    setTimeout(() => {
      const article = articles.find((article) => article.id === id);
      if (article) {
        resolve(article);
      } else {
        reject(new Error("Article not found"));
      }
    }, 1500);
  });
};

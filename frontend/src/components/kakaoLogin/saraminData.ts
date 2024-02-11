export type IPropsSelect = {
  [proficiencyLevel: string]: {
    id: number;
    name: string;
  }[];

  cardLevel: { id: number; name: string }[];
};

export type IPropsSelectList = {
  content: {
    id: number;
    name: string;
    maxGate: number[];
  }[];
};
export const selectRaidList: IPropsSelectList = {
  content: [
    { id: 1, name: "발탄", maxGate: [2, 2, 3] },
    { id: 2, name: "비아키스", maxGate: [3, 3, 3] },
    { id: 3, name: "쿠크세이튼", maxGate: [3, 3, 3] },
    { id: 4, name: "아브렐슈드", maxGate: [3, 4, 4] },
    { id: 5, name: "일리아칸", maxGate: [3, 4, 4] },
    { id: 6, name: "카멘", maxGate: [3, 4, 4] },
    { id: 7, name: "에퀴드나", maxGate: [2, 2, 3] },
    { id: 8, name: "카양겔", maxGate: [3, 3, 3] },
    { id: 9, name: "상아탑", maxGate: [4, 4, 4] },
  ],
};

export const selectList: IPropsSelect = {
  proficiencyLevel: [
    { id: 1, name: "트라이" },
    { id: 2, name: "클경" },
    { id: 3, name: "반숙" },
    { id: 4, name: "숙련" },
  ],
  cardLevel: [
    { id: 1, name: "조건 없음" },
    { id: 2, name: "세구빛18" },
    { id: 3, name: "세구빛30" },
    { id: 4, name: "암구빛18" },
    { id: 5, name: "암구빛30" },
  ],
};

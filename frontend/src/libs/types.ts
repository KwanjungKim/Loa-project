type IProficiency = "트라이" | "클경" | "반숙" | "숙련";
type IRaidDifficulty = "normal" | "hard" | "extreme";
type IRaidType =
  | "발탄"
  | "비아키스"
  | "쿠크세이튼"
  | "아브렐슈드"
  | "일리아칸"
  | "카멘"
  | "에키드나"
  | "상아탑"
  | "카양겔";

export interface IBoard {
  board_list: IBoard[] | null;
  board_number: number;
  card_level: string;
  character_name: string | null;
  content: string;
  limit: number;
  maxGate: "1" | "2" | "3" | "4" | "";
  member: string[] | null;
  member_count: number;
  mention: string | null;
  minGate: "1" | "2" | "3" | "4" | "";
  offset: number;
  party_member: string | null;
  proficiency: IProficiency;
  raid_difficulty: IRaidDifficulty;
  raid_leader: string;
  raid_type: IRaidType;
  startDate: string;
  title: string;
  user_number: string;
}
